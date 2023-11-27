package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.service.LocationService;
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
public class LocationController {
  private final LocationService locationService;

  @GetMapping(LOCATION_GET_ALL)
  public ResponseEntity<ResponseObject<Object>> getAll() {
    if (locationService.findAllLocation().isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder()
              .isSuccess(false)
              .message(MessageConstant.DATA_EMPTY)
              .data(locationService.findAllLocation())
              .build());
    }
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.SUCCESSFULLY)
            .data(locationService.findAllLocation())
            .build());
  }

  @GetMapping(LOCATION_GET_BY_CODE)
  public ResponseEntity<ResponseObject<Object>> getByCode(@PathVariable("code") String locationCode) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(locationService.getLocationByCode(locationCode))
            .build());
  }
}
