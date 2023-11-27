package obtbms.service;

import obtbms.entity.RoutePoint;

import java.util.List;
import java.util.Map;

public interface RoutePointService {
  Map<String, List<RoutePoint>> getAllRoutePointByTripId(int id);
}
