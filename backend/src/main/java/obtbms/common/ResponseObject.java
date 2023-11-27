package obtbms.common;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseObject<T> {
  private boolean isSuccess;
  private String message;
  private T data;
  private String errorDetails;
}
