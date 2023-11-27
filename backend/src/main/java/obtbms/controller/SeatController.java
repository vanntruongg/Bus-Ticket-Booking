package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.service.SeatService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class SeatController {
  private final SeatService seatService;

  @GetMapping(SEAT_GET_BY_TRIP_AND_TRIP_DATE)
  public ResponseEntity<ResponseObject<Object>> getAllSeatByTripId(
          @RequestParam("id") int id,
          @RequestParam("tripDate") @DateTimeFormat(pattern = "dd-MM-yyyy") Date tripDate
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(seatService.getAllSeatByTripId(id, tripDate))
            .build());
  }
}
