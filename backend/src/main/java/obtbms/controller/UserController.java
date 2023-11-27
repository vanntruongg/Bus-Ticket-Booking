package obtbms.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.entity.dto.ChangePasswordRequest;
import obtbms.entity.dto.FeedbackRequest;
import obtbms.entity.dto.ResetPasswordRequest;
import obtbms.entity.dto.UserDto;
import obtbms.enums.AccountStatus;
import obtbms.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  @PostMapping(USER_CREATE)
  public ResponseEntity<ResponseObject<Object>> createUser(@RequestBody @Valid UserDto userDto) {
    return ResponseEntity.ok().body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.CREATE_SUCCESS)
            .data(userService.createUser(userDto))
            .build());
  }

  @PostMapping(USER_UPDATE)
  public ResponseEntity<ResponseObject<Object>> updateUser(@RequestBody UserDto userDto) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.UPDATE_SUCCESS)
            .data(userService.updateUser(userDto))
            .build());
  }

  @PostMapping(USER_CREATE_BY_ADMIN)
  public ResponseEntity<ResponseObject<Object>> createdByAdmin(@RequestBody @Valid UserDto userDto) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.CREATE_SUCCESS)
            .data(userService.createdByAdmin(userDto))
            .build());
  }

  @PatchMapping(USER_UPDATE_BY_ADMIN)
  public ResponseEntity<ResponseObject<Object>> updatedByAdmin(@RequestBody @Valid UserDto userDto) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.UPDATE_SUCCESS)
            .data(userService.updatedByAdmin(userDto))
            .build());
  }

  @GetMapping(USER_GET)
  public ResponseEntity<ResponseObject<Object>> getUser() {
    return ResponseEntity.ok().body(ResponseObject.builder()
            .isSuccess(true)
            .message(String.format(MessageConstant.CHAR_SEQUENCE_3, MessageConstant.GET, MessageConstant.USER, MessageConstant.SUCCESSFULLY))
            .data(userService.getUser())
            .build());
  }

  @GetMapping(USER_GET_ALL)
  public ResponseEntity<ResponseObject<Object>> getAllUser() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(userService.getAllUser())
            .build());
  }

  @GetMapping(USER_COUNT)
  public ResponseEntity<ResponseObject<Object>> countUsers() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(userService.countUsers())
            .build());
  }

  @PostMapping(FORGOT_PASSWORD)
  public ResponseEntity<ResponseObject<Object>> forgotPassword(@RequestParam("email") String email) {
    if (userService.forgotPassword(email)) {
      return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().isSuccess(true).message(MessageConstant.REQUEST_RESET_PASSWORD_SUCCESS).build());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().isSuccess(false).message(MessageConstant.USER_NOT_FOUND).build());

    }
  }

  @PostMapping(RESET_PASSWORD)
  public ResponseEntity<ResponseObject<Object>> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
    if (userService.resetPassword(request)) {
      return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().isSuccess(true).message(MessageConstant.RESET_PASSWORD_SUCCESS).build());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().isSuccess(false).message(MessageConstant.RESET_PASSWORD_FAIL).build());
    }
  }

  @PostMapping(CHANGE_PASSWORD)
  public ResponseEntity<ResponseObject<Object>> changePassword(@RequestBody @Valid ChangePasswordRequest request) {
    if (userService.changePassword(request)) {
      return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder().isSuccess(true).message(MessageConstant.PASSWORD_CHANGE_SUCCESS).build());
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseObject.builder().isSuccess(false).message(MessageConstant.PASSWORD_CHANGE_FAIL).build());
    }
  }

  @DeleteMapping(DISABLE_ACCOUNT)
  public ResponseEntity<ResponseObject<Object>> disableAccount(@PathVariable("email") String email) {
    AccountStatus status = userService.disableAccount(email);
    return ResponseEntity.ok().body(ResponseObject.builder()
            .isSuccess(true)
            .message(String.format(MessageConstant.CHAR_SEQUENCE_2, status.toString(), MessageConstant.CHANGE_STATUS_ACCOUNT_SUCCESS))
            .data(status)
            .build());

  }

}
