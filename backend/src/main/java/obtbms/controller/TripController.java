package obtbms.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.entity.dto.TripRequestDto;
import obtbms.service.TripService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class TripController {
  private final TripService tripService;


  @PostMapping(TRIP_CREATE)
  public ResponseEntity<ResponseObject<Object>> createTrip(@RequestBody @Valid TripRequestDto tripRequestDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.CREATE_SUCCESS)
                    .data(tripService.createTrip(tripRequestDto))
            .build());
  }

  @GetMapping(TRIP_GET_ALL)
  public ResponseEntity<ResponseObject<Object>> getTripByOriginAndDestinationAndDate(
          @RequestParam String origin,
          @RequestParam String destination,
          @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date fromTime,
          @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd")  Date toTime,
          @RequestParam Boolean isReturn
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.SUCCESSFULLY)
            .data(tripService.getAllTripByOriginAndDestinationWithDate(origin, destination, fromTime, toTime, isReturn))
            .build()
    );
  }

  @GetMapping(TRIP_GET_BY_ID)
  public ResponseEntity<ResponseObject<Object>> getById(@PathVariable("id") int id) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(tripService.getTripById(id))
            .build());
  }

  @GetMapping(TRIP_GET_ALL_BY_DATE)
  public ResponseEntity<ResponseObject<Object>> getAllTripByDate(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(tripService.getAllTripByDate(date))
            .build());
  }

//  @GetMapping("/trips/month")
//  public ResponseEntity<ResponseObject<Object>> getAllTripInMonth(@RequestParam("month") int month) {
//    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
//                    .isSuccess(true)
//                    .message(MessageConstant.FIND_SUCCESS)
//                    .data(tripService.getAllTripInMonth(month))
//            .build());
//  }

  @GetMapping(TRIP_GET_ALL_BY_WEEK)
  public ResponseEntity<ResponseObject<Object>> getAllTripInWeek(@RequestParam("week") int week) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(tripService.getAllTripInWeek(week))
            .build());
  }

  @GetMapping(TRIP_GET_ALL_SCHEDULE_BY_WEEK)
  public ResponseEntity<ResponseObject<Object>> getScheduleTripByDate(@RequestParam("week") int week) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(tripService.getScheduleInWeek(week))
            .build());
  }

  @DeleteMapping(TRIP_UPDATE)
  public ResponseEntity<ResponseObject<Object>> updateTrip(@RequestBody TripRequestDto tripDto) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.DELETE_SUCCESS)
            .data(tripService.updateTrip(tripDto))
            .build());
  }

  @DeleteMapping(TRIP_DELETE)
  public ResponseEntity<ResponseObject<Object>> deleteTrip(@RequestParam("id") int tripId, @RequestParam("tripDate") @DateTimeFormat(pattern = "dd-MM-yyyy") Date tripDate) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.DELETE_SUCCESS)
                    .data(tripService.deleteTrip(tripId, tripDate))
            .build());
  }

}
























