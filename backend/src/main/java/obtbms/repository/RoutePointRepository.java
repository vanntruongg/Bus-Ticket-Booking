package obtbms.repository;

import obtbms.entity.RoutePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoutePointRepository extends JpaRepository<RoutePoint, Integer> {

  @Query("select rp " +
          "from RoutePoint rp " +
          "join rp.location l " +
          "where l.locationId = :locationId")
  List<RoutePoint> findAllByLocationId(@Param("locationId") int locationId);
}
