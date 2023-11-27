package obtbms.service;

import obtbms.entity.Bus;

import java.util.List;

public interface BusService {
  List<Bus> getAllUnusedBus();
}
