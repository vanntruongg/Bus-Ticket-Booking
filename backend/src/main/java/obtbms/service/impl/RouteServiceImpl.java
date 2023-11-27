package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.constant.MessageConstant;
import obtbms.entity.Location;
import obtbms.entity.Route;
import obtbms.entity.Trip;
import obtbms.entity.dto.RouteDto;
import obtbms.exception.DuplicationException;
import obtbms.exception.ErrorCode;
import obtbms.exception.NotFoundException;
import obtbms.repository.LocationRepository;
import obtbms.repository.RouteRepository;
import obtbms.repository.TripRepository;
import obtbms.service.LocationService;
import obtbms.service.RouteService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RouteServiceImpl implements RouteService {
  private final RouteRepository routeRepository;
  private final LocationRepository locationRepository;
  private final LocationService locationService;
  private final TripRepository tripRepository;

  @Override
  public Boolean createRoute(RouteDto routeDto) {
    try {
      Location origin = locationService.getLocationById(routeDto.getOriginId());
      Location destination = locationService.getLocationById(routeDto.getDestinationId());

      if (origin.equals(destination)) {
        throw new DuplicationException(ErrorCode.DUPLICATE_ORIGIN_AND_DESTINATION, MessageConstant.DUPLICATE_ORIGIN_AND_DESTINATION);
      }

      Optional<Route> routeExisted = getRouteByOriginAndDestination(origin, destination);
      if (routeExisted.isPresent()) {
        throw new DuplicationException(ErrorCode.NOT_NULL, MessageConstant.ROUTE_EXISTED);
      }

      Route route = new Route();
      route.setOriginId(origin);
      route.setDestinationId(destination);
      route.setJourneyDuration(routeDto.getJourneyDuration());
      route.setRouteLength(routeDto.getRouteLength());
      route.setPrice(routeDto.getPrice());
      routeRepository.save(route);
      return true;

    } catch (NotFoundException exception) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND, exception.getCause());
    }
  }

  @Override
  public Boolean updateRoute(RouteDto routeDto) {
    Optional<Route> routeOptional = routeRepository.findById(routeDto.getRouteId());
    if (routeOptional.isPresent()) {
      Location origin = locationService.getLocationById(routeDto.getOriginId());
      Location destination = locationService.getLocationById(routeDto.getDestinationId());

      if (origin.equals(destination)) {
        throw new DuplicationException(ErrorCode.DUPLICATE_ORIGIN_AND_DESTINATION, MessageConstant.DUPLICATE_ORIGIN_AND_DESTINATION);
      }

      Route route = routeOptional.get();
      Location originBeforeUpdate = route.getOriginId();
      Location destinationBeforeUpdate = route.getDestinationId();

      route.setOriginId(origin);
      route.setDestinationId(destination);
      route.setJourneyDuration(routeDto.getJourneyDuration());
      route.setRouteLength(routeDto.getRouteLength());
      route.setPrice(routeDto.getPrice());


      // Check if the origin and destination have changed after updating.
      // If they are the same, save the route; otherwise, check if the updated route already exists.
      // If it doesn't exist, save the updated route; otherwise, throw a duplication exception.
      if (!originBeforeUpdate.equals(route.getOriginId()) || !destinationBeforeUpdate.equals(route.getDestinationId())) {
        Optional<Route> routeExisted = getRouteByOriginAndDestination(route.getOriginId(), route.getDestinationId());
        if (routeExisted.isPresent()) {
          throw new DuplicationException(ErrorCode.NOT_NULL, MessageConstant.ROUTE_EXISTED);
        }
      }
      routeRepository.save(route);
      return true;
    } else {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND);
    }
  }

  @Override
  public Optional<Route> getRouteByOriginAndDestination(Location origin, Location destination) {
    return routeRepository.findRouteByOriginIdAndDestinationId(origin, destination);
  }

  @Override
  public Boolean deleteRoute(int routeId) {
    Optional<Route> routeOptional = routeRepository.findById(routeId);

    if (routeOptional.isEmpty()) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.DELETE_NOT_FOUND);
    }
    // Check if there are any trips associated with the route
    Optional<Trip> tripOptional = tripRepository.findFirstByRoute(routeOptional.get());
    if (tripOptional.isPresent()) {
      throw new DataIntegrityViolationException(MessageConstant.DATA_INTEGRITY_VIOLATION);
    }
    // If there are no associated trips, delete the route
    routeRepository.delete(routeOptional.get());
    return true;
  }

  @Override
  public List<Map<String, Object>> getAllRoute() {
    List<Map<String, Object>> listRoute = new ArrayList<>();
    List<Object[]> results = routeRepository.getAllRoute();
    for (Object[] result : results) {
      Map<String, Object> route = new HashMap<>();
      route.put("routeId", result[0]);
      route.put("originName", result[1]);
      route.put("destinationName", result[2]);

      listRoute.add(route);
    }
    return listRoute;
  }

  @Override
  public List<List<Route>> getAllAndGroupBy() {
    List<Route> routesGrouped = routeRepository.findAllAndGroupByOrigin();
    List<List<Route>> routesSameOrigin = new ArrayList<>();
    for (Route route : routesGrouped) {
      Location location = locationRepository.findById(route.getOriginId().getLocationId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
      List<Route> routes = routeRepository.findByOriginId(location);
      routesSameOrigin.add(routes);
    }
    return routesSameOrigin;
  }

  @Override
  public List<Route> getAllRouteByOrigin(String locationCode) {
    Location location = locationRepository.findLocationByLocationCode(locationCode);
    List<Route> routesByOrigin = routeRepository.findAllByOriginId(location);
    if (routesByOrigin.isEmpty()) {
      return Collections.emptyList();
    }
    return routesByOrigin;
  }

}
