package obtbms.repository;

import obtbms.entity.Ticket;
import obtbms.entity.Trip;
import obtbms.entity.User;
import obtbms.enums.TicketStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
  List<Ticket> findAllByUser(User user);

  List<Ticket> findAllByTripAndTripDate(Trip trip, Date date);

  @Query("select count(s) " +
          "from Ticket t " +
          "join t.seats s " +
          "where t.ticketId = :ticketId")
  int sumSeatCountByTicketId(@Param("ticketId") String ticketId);

  Optional<Ticket> findTicketByUserAndTicketId(User user, String ticketId);

  @Query("select count(t) " +
          "from Ticket  t " +
          "where t.tripDate = :date")
  int findAllTicketSoldToday(@Param("date") Date date);

  int countTicketByTripDateBetween(Date firstDay, Date lastDay);

//  float countAllTotalPriceByTripDateBetween(Date firstDay, Date lastDay);

  @Query("Select sum(t.totalPrice) " +
          "from Ticket t " +
          "where t.tripDate = :day " +
          "and t.status = 'SUCCESS'")
  Float totalPriceByTripDate(@Param("day") Date day);

  @Query("Select sum(t.totalPrice) " +
          "from Ticket t " +
          "where t.tripDate between :startDay and :endDay " +
          "and t.status = 'SUCCESS'")
  Float getTotalRevenueFromStartDayToEndDay(@Param("startDay") Date startDay, @Param("endDay") Date endDay);

  Integer countTicketByTripDate(Date today);

  Integer countTicketByBookingDate(Date today);


  @Transactional
  @Modifying
  @Query(value = "DELETE FROM ticket_seat WHERE ticket_id = :ticketId", nativeQuery = true)
  void deleteTicketSeatDataByTicketId(@Param("ticketId") String ticketId);

  @Query("select t from Ticket t " +
          "where ((:queryType is null and :currentDate is null) or " +
          "       (:queryType = 'newly_purchased' and t.tripDate >= :currentDate) or " +
          "       (:queryType = 'purchased_successfully' and t.tripDate < :currentDate)) " +
          "and (:email is null or t.user.email = :email) " +
          "and (:status is null or t.status = :status) ")
  List<Ticket> findTicketsByTypeAndStatus(
          @Param("queryType") String queryType,
          @Param("currentDate") Date currentDate,
          @Param("status") TicketStatus status,
          @Param("email") String email);

  Page<Ticket> findAll(Specification<Ticket> spec, Pageable pageable);

//  List<Ticket> findAll(Specification<Ticket> spec, Pageable pageable);


}
