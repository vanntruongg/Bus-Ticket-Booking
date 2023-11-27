package obtbms.repository;

import obtbms.entity.Location;
import obtbms.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Integer> {
  @Query("select r " +
          "from Route r " +
          "group by r.originId")
  List<Route> findAllAndGroupByOrigin();

  @Query("select r " +
          "from Route r " +
          "where r.originId = :originId")
  List<Route> findByOriginId(Location originId);

  List<Route> findAllByOriginId(Location location);

  @Query("select r.routeId, r.originId.locationName as originName, r.destinationId.locationName as destinationName from Route r ")
  List<Object[]> getAllRoute();

  Optional<Route> findRouteByOriginIdAndDestinationId(Location origin, Location destination);
}
