package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.entity.dto.TicketRequest;
import obtbms.enums.GetTicketType;
import obtbms.service.TicketService;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3030")
public class TicketController {
  private final TicketService ticketService;

  @PostMapping(TICKET_CREATE_NEW_BOOKING)
  public ResponseEntity<ResponseObject<Object>> createTicket(@RequestBody TicketRequest ticketRequest) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.CREATE_SUCCESS)
                    .data(ticketService.createTicket(ticketRequest))
            .build());
  }

  @PatchMapping(TICKET_CANCEL)
  public ResponseEntity<ResponseObject<Object>> createTicket(@PathVariable("id") String ticketId) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.UPDATE_SUCCESS)
            .data(ticketService.ticketCancel(ticketId))
            .build());
  }

  @GetMapping(TICKET_GET_ALL)
  public ResponseEntity<ResponseObject<Object>> getAllTicket() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(ticketService.getAllTicket())
            .build());
  }

  @GetMapping(TICKET_GET_BY_EMAIL)
  public ResponseEntity<ResponseObject<Object>> getAllTicketByUser(@RequestParam("email") String email) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(ticketService.getAllTickByEmail(email))
            .build());
  }

  @GetMapping(SEAT_GET_ALL_BY_TICKET_ID)
  public int getAllSeat(@PathVariable("id") String ticketId) {
    return ticketService.getAllSeat(ticketId);
  }

  @GetMapping(TICKET_GET_BY_PHONE_AND_TICKET_ID)
  public ResponseEntity<ResponseObject<Object>> getTicketByPhoneAndTicketId(
          @RequestParam("phone") String phone,
          @RequestParam("ticketId") String ticketId
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(ticketService.getTicketByPhoneAndTicketId(phone, ticketId))
            .build());
  }

  @GetMapping(TICKET_GET_ALL_SOLD_TODAY)
  public ResponseEntity<ResponseObject<Object>> getAllTicketSoldToday() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(ticketService.getAllTicketSoldToday())
            .build());

  }

//  @GetMapping(TICKET_GET_ALL_NEWLY_PURCHASE)
//  public ResponseEntity<ResponseObject<Object>> getAllNewlyPurchasedTickets() {
//    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
//            .isSuccess(true)
//            .message(MessageConstant.FIND_SUCCESS)
//            .data(ticketService.getTicketsByType(GetTicketType.NEWLY_PURCHASED))
//            .build());
//
//  }
//
//  @GetMapping(TICKET_GET_ALL_PURCHASE_SUCCESS)
//  public ResponseEntity<ResponseObject<Object>> getAllSuccessfullyPurchasedTickets() {
//    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
//            .isSuccess(true)
//            .message(MessageConstant.FIND_SUCCESS)
//            .data(ticketService.getTicketsByType(GetTicketType.SUCCESSFULLY_PURCHASED))
//            .build());
//
//  }
//
//  @GetMapping(TICKET_GET_ALL_CANCELED)
//  public ResponseEntity<ResponseObject<Object>> getAllCancelledTickets() {
//    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
//            .isSuccess(true)
//            .message(MessageConstant.FIND_SUCCESS)
//            .data(ticketService.getTicketsByType(GetTicketType.CANCELLED))
//            .build());
//
//  }

  @GetMapping(TICKET_GET_ALL_BY_TYPE)
  public ResponseEntity<ResponseObject<Object>> getAllTicketByType(
          @RequestParam("type") String type,
          @RequestParam("email") String email,
          @RequestParam(value = "pageNumber", defaultValue = "1") int pageNumber,
        @RequestParam(value = "pageSize", defaultValue = "10") int pageSize
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(ticketService.getTicketsByType(type, email, pageNumber, pageSize))
            .build());

  }

}
