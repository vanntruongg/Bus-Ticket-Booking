package obtbms.repository;

import obtbms.entity.Dates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface DatesRepository extends JpaRepository<Dates, Integer> {
  @Query("select d " +
          "from Dates d " +
          "join d.trips t " +
          "where t.tripId = :tripId " +
          "and d.tripDate = :tripDate"
  )
  List<Dates> findAllByTripIdAndTripDate(@Param("tripId") int tripId, @Param("tripDate") Date tripDate);
  Optional<Dates> findDatesByTripDate(Date date);
}
