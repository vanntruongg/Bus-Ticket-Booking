package obtbms.service;

import obtbms.entity.Location;
import obtbms.entity.Route;
import obtbms.entity.dto.RouteDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface RouteService {
  List<List<Route>> getAllAndGroupBy();
  List<Route> getAllRouteByOrigin(String locationCode);

  List<Map<String, Object>> getAllRoute();

  Boolean createRoute(RouteDto routeDto);

  Boolean updateRoute(RouteDto routeDto);

  Optional<Route> getRouteByOriginAndDestination(Location origin, Location destination);

  Boolean deleteRoute(int routeId);
}
