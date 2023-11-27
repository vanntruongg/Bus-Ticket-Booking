package obtbms.exception;

public class DuplicationException extends RuntimeException {
  protected final transient ErrorDetail errorDetail;

  public DuplicationException(int errorCode, String errorMessage) {
    super(errorMessage);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }
  public DuplicationException(int errorCode, String errorMessage, Throwable cause) {
    super(errorMessage, cause);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }
}
