package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.service.RoutePointService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class RoutePointController {
  private final RoutePointService routePointService;

  @GetMapping(ROUTE_POINT_GET_BY_TRIP)
  public ResponseEntity<ResponseObject<Object>> getAllSeatByTripId(@PathVariable("id") int id) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(routePointService.getAllRoutePointByTripId(id))
            .build());
  }
}
