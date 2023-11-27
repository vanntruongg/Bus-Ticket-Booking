package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.common.StringUtils;
import obtbms.constant.CommonConstant;
import obtbms.constant.MessageConstant;
import obtbms.entity.*;
import obtbms.entity.dto.TicketDto;
import obtbms.entity.dto.TicketRequest;
import obtbms.entity.dto.TicketResponse;
import obtbms.entity.dto.TripRequest;
import obtbms.enums.AccountStatus;
import obtbms.enums.GetTicketType;
import obtbms.enums.TicketStatus;
import obtbms.exception.ErrorCode;
import obtbms.exception.NotFoundException;
import obtbms.repository.*;
import obtbms.service.SeatService;
import obtbms.service.TicketService;
import obtbms.specifications.TicketSpecifications;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
  private final TicketRepository ticketRepository;
  private final UserRepository userRepository;
  private final TripRepository tripRepository;
  private final SeatService seatService;
  private final SeatRepository seatRepository;
  private final RoutePointRepository routePointRepository;
  private final MailServiceImpl mailService;

  private final TicketSpecifications ticketSpecifications;

  @Override
  @Transactional
  public Map<String, Object> createTicket(TicketRequest ticketRequest) {
    Optional<User> userOptional = userRepository.findById(ticketRequest.getEmail());
    User user;
    if (userOptional.isPresent()) {
      user = userOptional.get();
      user.setPhone(ticketRequest.getPhone());
      userRepository.saveAndFlush(user);
    } else {
      user = new User();
      Map<String, String> fullName = StringUtils.getName(ticketRequest.getFullName());
      user.setEmail(ticketRequest.getEmail());
      user.setPhone(ticketRequest.getPhone());
      user.setLastName(fullName.get("lastName"));
      user.setFirstName(fullName.get("firstName"));
      user.setStatus(AccountStatus.UNREGISTER);
      userRepository.save(user);
    }

    List<String> ticketIds = new ArrayList<>();
    // send mail
    List<Ticket> tickets = new ArrayList<>();

    for (TripRequest tripRequest : ticketRequest.getTripRequests()) {
      Optional<Trip> trip = tripRepository.findById(tripRequest.getTripId());

      RoutePoint routePoint = routePointRepository.findById(tripRequest.getPickUp())
              .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));

      List<Seat> listSeats = getAllSeatBySeatCode(tripRequest.getSeatCodes());
      Ticket ticket = new Ticket();
      ticket.setTicketId(StringUtils.generateStringId());
      ticket.setTotalPrice(tripRequest.getTotalPrice());
      ticket.setTripDate(tripRequest.getTripDate());
      ticket.setNote(ticketRequest.getNotes());
      ticket.setRoutePoint(routePoint);
      ticket.setPaymentMethod(CommonConstant.VN_PAY);
      ticket.setStatus(TicketStatus.SUCCESS);
      ticket.setBookingDate(new Date());
      ticket.setUser(user);
      ticket.setTrip(trip.orElse(null));
      ticket.setSeats(listSeats);
      ticketRepository.save(ticket);
      // send mail
      tickets.add(ticket);
      // add ticketIds for ticketResponse
      ticketIds.add(ticket.getTicketId());
    }
    mailService.sendMail(tickets);

    Map<String, Object> ticketResponse = new HashMap<>();
    ticketResponse.put("phone", ticketRequest.getPhone());
    ticketResponse.put("ticketId", ticketIds);
    return ticketResponse;
  }

  @Override
  public Integer getAllTicketSoldToday() {
    Date date = new Date();
    return ticketRepository.findAllTicketSoldToday(date);
  }

  @Override
  public Integer getAllTicketInMonth(Date firstDay, Date lastDay) {
    return ticketRepository.countTicketByTripDateBetween(firstDay, lastDay);
  }

  @Override
  public Float getAllRevenueInYear(Date startDay, Date endDay) {
    return ticketRepository.getTotalRevenueFromStartDayToEndDay(startDay, endDay);
  }

  @Override
  @Transactional
  public Boolean ticketCancel(String ticketId) {
    try {
      Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));

      // delete all seat in the table ticket_seat by ticket_id
      ticketRepository.deleteTicketSeatDataByTicketId(ticket.getTicketId());

      ticket.setStatus(TicketStatus.CANCELLED);
      ticketRepository.save(ticket);
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }

  @Override
  public Optional<Page<TicketResponse>> getTicketsByType(String ticketType, String email, int pageNumber, int pageSize) {
    Date currentDate = new Date();
    Specification<Ticket> spec = null;
    Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("bookingDate").descending());

    if (GetTicketType.NEWLY_PURCHASED.getValue().equalsIgnoreCase(ticketType)) {
      spec = ticketSpecifications.filterTickets(GetTicketType.NEWLY_PURCHASED.getValue(), currentDate, TicketStatus.SUCCESS, email);
    } else if (GetTicketType.SUCCESSFULLY_PURCHASED.getValue().equalsIgnoreCase(ticketType)) {
      spec = ticketSpecifications.filterTickets(GetTicketType.SUCCESSFULLY_PURCHASED.getValue(), currentDate, TicketStatus.SUCCESS, email);
    } else if (GetTicketType.CANCELLED.getValue().equalsIgnoreCase(ticketType)) {
      spec = ticketSpecifications.filterTickets(null, null, TicketStatus.CANCELLED, email);
    }

    Page<Ticket> ticketPage = ticketRepository.findAll(spec, pageable);
    Page<TicketResponse> ticketResponses = convertPageToTicketResponsePage(Objects.requireNonNull(ticketPage));
    return Optional.of(ticketResponses);
  }

  @Override
  public Float getAllRevenueInMonth(Date startDay, Date endDay) {
    return ticketRepository.getTotalRevenueFromStartDayToEndDay(startDay, endDay);
  }

  @Override
  public Float getTotalRevenueInWeek(Date startDay, Date endDay) {
    return ticketRepository.getTotalRevenueFromStartDayToEndDay(startDay, endDay);
  }

  @Override
  public Float getTotalRevenueInDay(Date day) {
    return ticketRepository.totalPriceByTripDate(day);
  }

  private List<Seat> getAllSeatBySeatCode(List<String> seatCodes) {
    List<Integer> seatIds = new ArrayList<>();
    for (String seatCode : seatCodes) {
      Seat seat = seatRepository.findSeatBySeatCode(seatCode);
      seatIds.add(seat.getSeatId());
    }
    return seatService.getAllBySeatIds(seatIds);
  }

  @Override
  public List<TicketResponse> getAllTickByEmail(String email) {
    User user = userRepository.findById(email).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
    List<Ticket> ticketList = ticketRepository.findAllByUser(user);
    if (ticketList.isEmpty()) {
      return Collections.emptyList();
    }
    return setTicketResponse(ticketList);
  }

  @Override
  public List<TicketResponse> getAllTicket() {
    List<Ticket> ticketList = ticketRepository.findAll();
    if (ticketList.isEmpty()) {
      return Collections.emptyList();
    }
    return setTicketResponse(ticketList);
  }

  private  List<TicketResponse> setTicketResponse(List<Ticket> ticketList) {
    List<TicketResponse> ticketResponses = new ArrayList<>();
    for (Ticket ticket : ticketList) {
      TicketResponse ticketResponse = new TicketResponse();
      ticketResponse.setTicketId(ticket.getTicketId());
      ticketResponse.setTotalPrice(ticket.getTotalPrice());
      ticketResponse.setTripDate(ticket.getTripDate());
      ticketResponse.setPaymentMethod(ticket.getPaymentMethod());
      ticketResponse.setStatus(ticket.getStatus());
      ticketResponse.setTrip(ticket.getTrip());
      ticketResponse.setUser(ticket.getUser());

      ticketResponses.add(ticketResponse);
    }
    return ticketResponses;
  }

  private Page<TicketResponse> convertPageToTicketResponsePage(Page<Ticket> ticketPage) {
    return ticketPage.map(ticket -> new TicketResponse(
            ticket.getTicketId(),
            ticket.getTripDate(),
            ticket.getTotalPrice(),
            ticket.getPaymentMethod(),
            ticket.getStatus(),
            ticket.getTrip(),
            ticket.getUser()
    ));
  }

  @Override
  public int getAllSeat(String ticketId) {
    return ticketRepository.sumSeatCountByTicketId(ticketId);
  }

  @Override
  public TicketDto getTicketByPhoneAndTicketId(String phone, String ticketId) {
    try {
      Optional<User> user = userRepository.findUserByPhone(phone);
      if (user.isEmpty()) {
        throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND);
      }
      Ticket ticket = ticketRepository.findTicketByUserAndTicketId(user.get(), ticketId).orElseThrow(() ->
              new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));

      List<String> seatCodes = new ArrayList<>();
      for (Seat seat : ticket.getSeats()) {
        seatCodes.add(seat.getSeatCode());
      }

      TicketDto ticketDto = new TicketDto();
      ticketDto.setTicketId(ticket.getTicketId());
      ticketDto.setFullName(ticket.getUser().getLastName() + " " + ticket.getUser().getFirstName());
      ticketDto.setPhone(StringUtils.maskPhone(ticket.getUser().getPhone()));
      ticketDto.setEmail(StringUtils.maskEmail(ticket.getUser().getEmail()));
      ticketDto.setTotalPrice(ticket.getTotalPrice());
      ticketDto.setPaymentMethod(ticket.getPaymentMethod());
      ticketDto.setStatus(ticket.getStatus().getValue());
      ticketDto.setRoute(ticket.getTrip().getRoute().getOriginId().getLocationName() + " - " + ticket.getTrip().getRoute().getDestinationId().getLocationName());
      ticketDto.setDepartureTime(ticket.getTrip().getDepartureTime());
      ticketDto.setTripDate(ticket.getTripDate());
      ticketDto.setSeatCode(seatCodes);
      ticketDto.setRoutePoint(ticket.getRoutePoint());
      ticketDto.setFare(ticket.getTrip().getRoute().getPrice());
      ticketDto.setLicensePlate(ticket.getTrip().getBus().getLicensePlate());
      ticketDto.setNotes(ticket.getNote());

      return ticketDto;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, ex.getCause());
    }
  }

  public int getTotalTicketSoldInDay(Date date) {
    return ticketRepository.countTicketByTripDate(date);
  }
}
