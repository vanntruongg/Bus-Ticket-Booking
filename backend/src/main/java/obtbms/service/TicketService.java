package obtbms.service;

import obtbms.entity.dto.TicketDto;
import obtbms.entity.dto.TicketRequest;
import obtbms.entity.dto.TicketResponse;
import obtbms.enums.GetTicketType;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface TicketService {
  List<TicketResponse> getAllTickByEmail(String email);
  List<TicketResponse> getAllTicket();
  int getAllSeat(String ticketId);

  TicketDto getTicketByPhoneAndTicketId(String phone, String ticketId);

  Map<String, Object> createTicket(TicketRequest ticketRequest);

  Integer getAllTicketSoldToday();

  Integer getAllTicketInMonth(Date firstDay, Date lastDay);

  Float getAllRevenueInMonth(Date firstDay, Date lastDay);

  Float getTotalRevenueInDay(Date day);

  Float getTotalRevenueInWeek(Date startDay, Date endDay);

  Float getAllRevenueInYear(Date startDay, Date endDay);

  Boolean ticketCancel(String ticketId);

  Optional<Page<TicketResponse>> getTicketsByType(String ticketType, String email, int pageNumber, int pageSize);
}
