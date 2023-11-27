package obtbms.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class ErrorDetail {
  private final Integer errorCode;
  private final String errorMessage;
}
