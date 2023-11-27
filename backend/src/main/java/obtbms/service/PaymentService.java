package obtbms.service;


import obtbms.entity.dto.PaymentRequest;

import java.io.UnsupportedEncodingException;

public interface PaymentService {
  String createOrder(PaymentRequest paymentRequest) throws UnsupportedEncodingException;
}
