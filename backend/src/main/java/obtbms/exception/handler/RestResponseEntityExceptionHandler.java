package obtbms.exception.handler;

import obtbms.common.ResponseObject;
import obtbms.exception.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(value = {ApplicationException.class, NotFoundException.class, IOException.class, MessageException.class})
  public ResponseEntity<ResponseObject<Object>> handleApplicationException(Exception exception, WebRequest request) {
    return ResponseEntity.internalServerError().body(ResponseObject.builder()
            .isSuccess(false)
            .message(exception.getMessage())
            .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
            .build());
  }

  @ExceptionHandler(value = ForbiddenException.class)
  public ResponseEntity<ResponseObject<Object>> forbiddenException(Exception exception, WebRequest request) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ResponseObject.builder()
            .isSuccess(false)
            .message(exception.getMessage())
            .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
            .build());
  }

  @ExceptionHandler(value = {DuplicationException.class})
  public ResponseEntity<ResponseObject<Object>> duplicationException(Exception exception, WebRequest request) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(ResponseObject.builder()
            .isSuccess(false)
            .message(exception.getMessage())
            .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
            .build());
  }
  @ExceptionHandler(value = {ExpiredException.class})
  public ResponseEntity<ResponseObject<Object>> expiredException(Exception exception, WebRequest request) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ResponseObject.builder()
            .isSuccess(false)
            .message(exception.getMessage())
            .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
            .build());
  }
  @ExceptionHandler(value = {DataIntegrityViolationException.class})
  public ResponseEntity<ResponseObject<Object>> dataIntegrityViolationException(Exception exception, WebRequest request) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ResponseObject.builder()
            .isSuccess(false)
            .message(exception.getMessage())
            .errorDetails(exception.getCause() != null ? exception.getCause().getMessage() : StringUtils.EMPTY)
            .build());
  }
}
