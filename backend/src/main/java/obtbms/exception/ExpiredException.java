package obtbms.exception;

import lombok.Getter;

@Getter
public class ExpiredException extends RuntimeException {

  protected final transient ErrorDetail errorDetail;

  public ExpiredException(int errorCode, String errorMessage) {
    super(errorMessage);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }

  public ExpiredException(int errorCode, String errorMessage, Throwable cause) {
    super(errorMessage, cause);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }
}
