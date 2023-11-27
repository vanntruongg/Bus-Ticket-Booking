package obtbms.repository;

import obtbms.entity.Seat;
import obtbms.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

  @Query("select s " +
          "from Seat s " +
          "join s.tickets t " +
          "join t.trip tr " +
          "where tr.tripId = :id " +
          "and t.tripDate = :tripDate")
  List<Seat> findSeatByTripId(@Param("id") int id, @Param("tripDate") Date tripDate);

  Seat findSeatBySeatCode(String seatCode);

}
