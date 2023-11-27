package obtbms.service;

import obtbms.entity.Location;

import java.util.List;

public interface LocationService {
  List<Location> findAllLocation();
  Location getLocationByCode(String locationCode);
  Location getLocationById(int locationId);
}
