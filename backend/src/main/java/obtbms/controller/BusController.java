package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.service.BusService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static obtbms.constant.ApiEndpoint.BASE_API;
import static obtbms.constant.ApiEndpoint.BUS_GET_ALL_UNUSED;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class BusController {

  private final BusService busService;

  @GetMapping(BUS_GET_ALL_UNUSED)
  public ResponseEntity<ResponseObject<Object>> getAllUnusedBus() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(busService.getAllUnusedBus())
            .build());
  }
}
