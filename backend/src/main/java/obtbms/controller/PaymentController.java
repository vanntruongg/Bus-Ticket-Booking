package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.entity.dto.PaymentRequest;
import obtbms.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

import static obtbms.constant.ApiEndpoint.BASE_API;
import static obtbms.constant.ApiEndpoint.CREATE_ORDER_PAYMENT;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class PaymentController {
  private final PaymentService vnPayService;

  @PostMapping(CREATE_ORDER_PAYMENT)
  public ResponseEntity<String> createOrder(@RequestBody PaymentRequest paymentRequest) throws UnsupportedEncodingException {
    return ResponseEntity.status(HttpStatus.OK).body(vnPayService.createOrder(paymentRequest));
  }
}
