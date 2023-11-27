package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.constant.MessageConstant;
import obtbms.entity.Location;
import obtbms.exception.ErrorCode;
import obtbms.exception.NotFoundException;
import obtbms.repository.LocationRepository;
import obtbms.service.LocationService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
  private final LocationRepository locationRepository;
  @Override
  public List<Location> findAllLocation() {
    List<Location> locations = locationRepository.findAll();
    return locations.isEmpty() ?  Collections.emptyList() : locations;
  }

  @Override
  public Location getLocationByCode(String locationCode) {
    return locationRepository.findLocationByLocationCode(locationCode);
  }

  @Override
  public Location getLocationById(int locationId) {
    return locationRepository.findById(locationId).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.NOT_FOUND));
  }
}
