package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.entity.Bus;
import obtbms.repository.BusRepository;
import obtbms.service.BusService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusServiceImpl implements BusService {

  private final BusRepository busRepository;
  @Override
  public List<Bus> getAllUnusedBus() {
    return busRepository.findBusUnused();
  }
}
