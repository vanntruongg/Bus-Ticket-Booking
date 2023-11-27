package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.common.DateTimeStatisticalUtil;
import obtbms.common.StringUtils;
import obtbms.constant.MessageConstant;
import obtbms.entity.*;
import obtbms.entity.dto.ScheduleTripDto;
import obtbms.entity.dto.TripManagementDto;
import obtbms.entity.dto.TripDto;
import obtbms.entity.dto.TripRequestDto;
import obtbms.exception.DuplicationException;
import obtbms.exception.ErrorCode;
import obtbms.exception.NotFoundException;
import obtbms.repository.*;
import obtbms.service.DatesService;
import obtbms.service.TripService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
  private final TripRepository tripRepository;
  private final TicketRepository ticketRepository;
  private final RouteRepository routeRepository;
  private final BusRepository busRepository;
  private final DatesRepository datesRepository;
  private final DatesService datesService;

  @Override
  public Boolean createTrip(TripRequestDto tripRequestDto) {
    Route route = routeRepository.findById(tripRequestDto.getRouteId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
    Bus bus = busRepository.findById(tripRequestDto.getBusId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
    // if datesOptional is present then set dates is datesOptional else create a new Dates and set it for dates
    Dates dates = datesRepository.findDatesByTripDate(tripRequestDto.getTripDate())
            .orElseGet(() -> datesService.createDate(tripRequestDto.getTripDate()));

    // find trip with route, bus and departureTime
    Optional<Trip> tripExisted = tripRepository.findTripByRouteAndBusAndDepartureTime(route, bus, tripRequestDto.getDepartureTime());
    try {
      // if trip is present
      if (tripExisted.isPresent()) {
        Trip trip = tripExisted.get();
        // check dateList of this Trip had date want to add
        if (trip.getDatesList().contains(dates)) {
          // if already there throw new Exception
          throw new DuplicationException(ErrorCode.NOT_NULL, MessageConstant.EXISTED);
        } else {
          // else (not yet on dateList) added date to the dateList for this trip
          trip.getDatesList().add(dates);
          tripRepository.save(trip);
          return true;
        }
      } else {
        // if not exists then create new a trip
        Trip newTrip = new Trip();
        List<Dates> datesList = new ArrayList<>();
        datesList.add(dates);

        newTrip.setRoute(route);
        newTrip.setBus(bus);
        newTrip.setDepartureTime(tripRequestDto.getDepartureTime());
        newTrip.setDatesList(datesList);
        tripRepository.save(newTrip);
        return true;
      }
    } catch (Exception ex) {
      throw new DuplicationException(ErrorCode.NOT_NULL, MessageConstant.EXISTED, ex.getCause());
    }
  }

  @Override
  @Transactional
  public Boolean deleteTrip(int tripId, Date tripDate) {
    Trip trip = tripRepository.findById(tripId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
    List<Ticket> ticket = ticketRepository.findAllByTripAndTripDate(trip, tripDate);

    if (!ticket.isEmpty()) {
      throw new DataIntegrityViolationException(MessageConstant.DATA_INTEGRITY_VIOLATION);
    }
    tripRepository.delete(trip);
    return true;
  }

  @Override
  @Transactional
  public Boolean updateTrip(TripRequestDto tripDto) {
    try {
      Trip trip = tripRepository.findById(tripDto.getTripId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
      List<Ticket> ticket = ticketRepository.findAllByTripAndTripDate(trip, tripDto.getTripDate());

      if (!ticket.isEmpty()) {
        throw new DataIntegrityViolationException(MessageConstant.DATA_INTEGRITY_VIOLATION);
      }

      Bus bus = busRepository.findById(tripDto.getBusId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
      Route route = routeRepository.findById(tripDto.getRouteId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
      trip.setBus(bus);
      trip.setRoute(route);
      trip.setDepartureTime(tripDto.getDepartureTime());

      tripRepository.save(trip);
      return true;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.DELETE_NOT_FOUND, ex.getCause());
    }
  }

  @Override
  public Object getAllTripByOriginAndDestinationWithDate(String origin, String destination, Date fromTime, Date toTime, boolean isReturn) {
    Map<String, List<TripDto>> dataRoundTrip = new HashMap<>();

    List<Trip> trips;
    List<Trip> roundTrips;

    if (!isReturn) {
      trips = tripRepository.findAllTripByRoute(origin, destination, fromTime);

      if (trips.isEmpty()) {
        return Collections.emptyList();
      } else {
        List<TripDto> tripResponses = mapTripToTripDto(trips, fromTime);
        dataRoundTrip.put("trip", tripResponses);
        return dataRoundTrip;
      }
    } else {
      trips = tripRepository.findAllTripByRoute(origin, destination, fromTime);
      roundTrips = tripRepository.findAllTripByRoute(destination, origin, toTime);
      // neu tim ve khu hoi, chuyen di hoac chuyen ve khong co return empty list
      if (trips.isEmpty() || roundTrips.isEmpty()) {
        return Collections.emptyList();
      } else {
        List<TripDto> tripResponses = mapTripToTripDto(trips, fromTime);
        List<TripDto> roundTripResponses = mapTripToTripDto(roundTrips, toTime);
        dataRoundTrip.put("trip", tripResponses);
        dataRoundTrip.put("roundTrip", roundTripResponses);
        return dataRoundTrip;
      }
    }
  }

  private List<TripDto> mapTripToTripDto(List<Trip> trips, Date tripDate) {
    List<TripDto> tripDtoList = new ArrayList<>();

    for (Trip trip : trips) {
      int seatsAvailable = 0;
      List<Ticket> ticketList = ticketRepository.findAllByTripAndTripDate(trip, tripDate);
      // lay tat ca cac ghe trong nhung ve da dat
      for (Ticket ticket : ticketList) {
        int result = ticketRepository.sumSeatCountByTicketId(ticket.getTicketId());
        seatsAvailable += result;
      }

      DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");

      TripDto TripDto = new TripDto();
      TripDto.setTripId(trip.getTripId());
      TripDto.setTripPrice(trip.getRoute().getPrice());
      TripDto.setTripJourneyDuration(trip.getRoute().getJourneyDuration());
      TripDto.setTripDepartureTime(trip.getDepartureTime());
      TripDto.setTripArrivalTime(StringUtils.calculateArrivalTimeFromDepartureTimeAndJourneyDuration(
                      trip.getDepartureTime(),
                      trip.getRoute().getJourneyDuration()
              )
      );
      TripDto.setTripDate(dateFormat.format(tripDate));
      TripDto.setTripFromLocation(trip.getRoute().getOriginId().getLocationName());
      TripDto.setTripToLocation(trip.getRoute().getDestinationId().getLocationName());
      TripDto.setTripBusType(trip.getBus().getBusType().getBusTypeName());
      // lay tong so ghe - nhung ghe da dat
      TripDto.setTripSeatsAvailable(trip.getBus().getBusType().getSeatCount() - seatsAvailable);

      tripDtoList.add(TripDto);
    }
    return tripDtoList;
  }

  @Override
  public Trip getTripById(int id) {
    return tripRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
  }

  @Override
  public List<TripManagementDto> getAllTripByDate(Date date) {
    List<Object[]> results = tripRepository.findAllByDate(date);
    return setResultToTripManagementDto(results);
  }

  @Override
  public Map<String, List<TripManagementDto>> getAllTripInMonth(int month) {
    Map<String, List<TripManagementDto>> listMapTripManagement = new HashMap<>();
    List<Date> dateList = DateTimeStatisticalUtil.getDaysInMonth(month);
    for (Date date : dateList) {
      List<Object[]> results = tripRepository.findAllByDate(date);
      List<TripManagementDto> tripManagementDtoList = setResultToTripManagementDto(results);
      listMapTripManagement.put(DateTimeStatisticalUtil.formatDate(date), tripManagementDtoList);
    }
    return listMapTripManagement;
  }

  @Override
  public Map<String, List<TripManagementDto>> getAllTripInWeek(int week) {
    Map<String, List<TripManagementDto>> listTripInWeek = new HashMap<>();
    int month = DateTimeStatisticalUtil.getCurrentMonth();
    Map<Integer, List<Date>> listDateInWeeks = DateTimeStatisticalUtil.getDaysOfWeekInMonth(month);
    List<Date> dateList = listDateInWeeks.get(week);

    for (Date date : dateList) {
      List<Object[]> results = tripRepository.findAllByDate(date);
      List<TripManagementDto> tripManagementDtoList = setResultToTripManagementDto(results);
      listTripInWeek.put(DateTimeStatisticalUtil.formatDate(date), tripManagementDtoList);
    }
    return listTripInWeek;
  }

  @Override
  public Map<String, List<ScheduleTripDto>> getScheduleInWeek(int week) {
    Map<String, List<ScheduleTripDto>> listTripInWeek = new HashMap<>();
    int month = DateTimeStatisticalUtil.getCurrentMonth();
    Map<Integer, List<Date>> listDateInWeeks = DateTimeStatisticalUtil.getDaysOfWeekInMonth(month);
    List<Date> dateList = listDateInWeeks.get(week);

    for (Date date : dateList) {
      List<Object[]> results = tripRepository.findScheduleByDate(date);
      List<ScheduleTripDto> scheduleTripDtoList = new ArrayList<>();
      for (Object[] result : results) {
        ScheduleTripDto scheduleTripDto = new ScheduleTripDto();
        scheduleTripDto.setDepartureTime((Time) result[0]);
        scheduleTripDto.setOriginName((String) result[1]);
        scheduleTripDto.setDestinationName((String) result[2]);
        scheduleTripDto.setFirstName((String) result[3]);
        scheduleTripDto.setLastName((String) result[4]);
        scheduleTripDtoList.add(scheduleTripDto);
      }
      listTripInWeek.put(DateTimeStatisticalUtil.formatDate(date), scheduleTripDtoList);
    }
    return listTripInWeek;
  }

  private List<TripManagementDto> setResultToTripManagementDto(List<Object[]> results) {
    List<TripManagementDto> tripManagementDtoList = new ArrayList<>();
    for (Object[] result : results) {
      TripManagementDto tripManagementDto = new TripManagementDto();
      tripManagementDto.setTripId((int) result[0]);
      tripManagementDto.setRouteId((int) result[1]);
      tripManagementDto.setBus((Bus) result[2]);
      tripManagementDto.setDepartureTime((Time) result[3]);
      tripManagementDto.setTripDate((Date) result[4]);
      tripManagementDto.setOriginName((String) result[5]);
      tripManagementDto.setDestinationName((String) result[6]);
      tripManagementDto.setDriverName(result[7] + " " + result[8]);
      tripManagementDto.setBusLicensePlate((String) result[9]);

      tripManagementDtoList.add(tripManagementDto);
    }
    return tripManagementDtoList;
  }

}
