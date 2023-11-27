package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.constant.MessageConstant;
import obtbms.entity.Route;
import obtbms.entity.RoutePoint;
import obtbms.entity.Trip;
import obtbms.exception.ErrorCode;
import obtbms.exception.NotFoundException;
import obtbms.repository.RoutePointRepository;
import obtbms.repository.RouteRepository;
import obtbms.repository.TripRepository;
import obtbms.service.RoutePointService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoutePointServiceImpl implements RoutePointService {
  private final RoutePointRepository routePointRepository;
  private final TripRepository tripRepository;
  private final RouteRepository routeRepository;
  @Override
  public Map<String, List<RoutePoint>> getAllRoutePointByTripId(int id) {
    Trip trip = tripRepository.findById(id).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
    Route route = routeRepository.findById(trip.getRoute().getRouteId()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));

    Map<String, List<RoutePoint>> routePoints = new HashMap<>();

    List<RoutePoint> listRoutePointOrigin = routePointRepository.findAllByLocationId(route.getOriginId().getLocationId());
    List<RoutePoint> listRoutePointDestination = routePointRepository.findAllByLocationId(route.getDestinationId().getLocationId());

    routePoints.put("routePointOrigin", listRoutePointOrigin);
    routePoints.put("routePointDestination", listRoutePointDestination);

    return routePoints;
  }
}
