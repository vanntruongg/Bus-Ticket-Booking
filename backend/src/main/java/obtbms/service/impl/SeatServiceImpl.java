package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.entity.Seat;
import obtbms.repository.SeatRepository;
import obtbms.service.SeatService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {
  private final SeatRepository seatRepository;
  @Override
  public List<Seat> getAllSeatByTripId(int id, Date tripDate) {
    return seatRepository.findSeatByTripId(id, tripDate);
  }

  @Override
  public List<Seat> getAllBySeatIds(List<Integer> ids) {
    return seatRepository.findAllById(ids);
  }

}
