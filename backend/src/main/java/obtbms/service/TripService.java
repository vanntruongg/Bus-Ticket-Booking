package obtbms.service;

import obtbms.entity.Trip;
import obtbms.entity.dto.ScheduleTripDto;
import obtbms.entity.dto.TripManagementDto;
import obtbms.entity.dto.TripRequestDto;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface TripService {
  Object getAllTripByOriginAndDestinationWithDate(String origin, String destination, Date fromTime, Date toTime, boolean isReturn);
  Trip getTripById(int id);

  List<TripManagementDto> getAllTripByDate(Date date);

  Map<String, List<TripManagementDto>> getAllTripInMonth(int month);

  Map<String, List<TripManagementDto>> getAllTripInWeek(int week);
  Map<String, List<ScheduleTripDto>> getScheduleInWeek(int week);

  Boolean createTrip(TripRequestDto tripRequestDto);

  Boolean deleteTrip(int tripId, Date tripDate);
  Boolean updateTrip(TripRequestDto tripDto);
}
