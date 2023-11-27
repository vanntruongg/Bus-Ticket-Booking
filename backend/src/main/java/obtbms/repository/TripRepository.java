package obtbms.repository;

import obtbms.entity.Bus;
import obtbms.entity.Dates;
import obtbms.entity.Route;
import obtbms.entity.Trip;
import obtbms.entity.dto.ScheduleTripDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {

  @Query("SELECT t " +
          "FROM Trip t " +
          "join t.route r " +
          "join t.datesList td " +
          "where r.originId.locationCode = :origin " +
          "and r.destinationId.locationCode = :destination " +
          "and td.tripDate = :tripDate")
  List<Trip> findAllTripByRoute(
          @Param("origin") String origin,
          @Param("destination") String destination,
          @Param("tripDate") Date tripDate);

  @Query("select t.tripId, r.routeId, b, t.departureTime, td.tripDate, origin.locationName as originName, destination.locationName as destinationName, u.lastName, u.firstName, b.licensePlate " +
          "from Trip t " +
          "join t.bus b " +
          "join b.listDriver dr " +
          "join dr.user u " +
          "join t.route r " +
          "join r.originId origin " +
          "join r.destinationId destination " +
          "join t.datesList td " +
          "where td.tripDate = :date " +
          "ORDER by t.departureTime")
  List<Object[]> findAllByDate(@Param("date") Date date);

  @Query("select t.departureTime, origin.locationName as originName, destination.locationName as destinationName, u.firstName, u.lastName " +
          "from Trip t " +
          "join t.bus b " +
          "join b.listDriver dr " +
          "join dr.user u " +
          "join t.route r " +
          "join r.originId origin " +
          "join r.destinationId destination " +
          "join t.datesList td " +
          "where td.tripDate = :date " +
          "ORDER by t.departureTime")
  List<Object[]> findScheduleByDate(@Param("date") Date date);

  @Query("SELECT t FROM Trip t " +
          "WHERE t.route = :route " +
          "AND t.bus = :bus " +
          "AND t.departureTime = :departureTime ")
  Optional<Trip> findTripByRouteAndBusAndDepartureTime(
          @Param("route") Route route,
          @Param("bus") Bus bus,
          @Param("departureTime") Time departureTime
  );

  Optional<Trip> findFirstByRoute(Route route);
}
