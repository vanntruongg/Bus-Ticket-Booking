package obtbms.service;


import obtbms.entity.Seat;
import obtbms.entity.Ticket;

import java.util.Date;
import java.util.List;

public interface SeatService {
  List<Seat> getAllSeatByTripId(int id, Date tripDate);

  List<Seat> getAllBySeatIds(List<Integer> ids);

}
