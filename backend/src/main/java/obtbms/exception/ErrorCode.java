package obtbms.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ErrorCode {

  public static final Integer NOT_NULL = 300;
  public static final Integer NOT_FOUND = 404;
  public static final Integer NULL = 405;
  public static final Integer DENIED = 403;
  public static final Integer EXPIRED = 101;
  public static final Integer DUPLICATE_ORIGIN_AND_DESTINATION = 1001;
  public static final Integer OLD_PASSWORD_INCORRECT = 1002;
}
