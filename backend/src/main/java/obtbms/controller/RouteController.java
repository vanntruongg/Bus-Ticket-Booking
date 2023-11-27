package obtbms.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.entity.Location;
import obtbms.entity.dto.RouteDto;
import obtbms.repository.LocationRepository;
import obtbms.service.RouteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;
import java.util.Optional;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class RouteController {
  private final RouteService routeService;

  @PostMapping(ROUTE_CREATE)
  public ResponseEntity<ResponseObject<Object>> createRoute(@RequestBody @Valid RouteDto routeDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.CREATE_SUCCESS)
                    .data(routeService.createRoute(routeDto))
            .build());
  }

  @PatchMapping(ROUTE_UPDATE)
  public ResponseEntity<ResponseObject<Object>> updateRoute(@RequestBody @Valid RouteDto routeDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.UPDATE_SUCCESS)
            .data(routeService.updateRoute(routeDto))
            .build());
  }
  @PatchMapping(ROUTE_DELETE)
  public ResponseEntity<ResponseObject<Object>> deleteRoute(@PathVariable("id") int routeId) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.DELETE_SUCCESS)
            .data(routeService.deleteRoute(routeId))
            .build());
  }

  @GetMapping(ROUTE_GET_ALL)
  public ResponseEntity<ResponseObject<Object>> getAllRoute() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(routeService.getAllRoute())
            .build());
  }


  @GetMapping(ROUTE_GET_ALL_AND_GROUP_BY)
  public ResponseEntity<ResponseObject<Object>> getAllAndGroupBy() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(routeService.getAllAndGroupBy())
            .build());
  }

  @GetMapping(ROUTE_GET_ALL_BY_ORIGIN)
  public ResponseEntity<ResponseObject<Object>> getAllByOrigin(@PathVariable("locationCode") String locationCode) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(routeService.getAllRouteByOrigin(locationCode))
            .build());
  }
}
