package obtbms.exception;


import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException{

  protected final transient ErrorDetail errorDetail;

  public NotFoundException(int errorCode, String errorMessage) {
    super(errorMessage);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }

  public NotFoundException(int errorCode, String errorMessage, Throwable cause) {
    super(errorMessage, cause);
    this.errorDetail = ErrorDetail.builder()
            .errorCode(errorCode)
            .errorMessage(errorMessage)
            .build();
  }
}
