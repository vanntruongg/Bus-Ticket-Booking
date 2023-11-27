package obtbms.exception;

import lombok.Getter;

@Getter
public class MessageException extends RuntimeException{

  protected final transient ErrorDetail errorDetail;

  public MessageException(int errorCode, String errorMessage) {
    super(errorMessage);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }

  public MessageException(int errorCode, String errorMessage, Throwable cause) {
    super(errorMessage, cause);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }
}
