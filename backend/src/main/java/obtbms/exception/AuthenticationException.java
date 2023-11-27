package obtbms.exception;

import org.springframework.http.HttpStatus;

public class AuthenticationException extends ApplicationException  {

  public AuthenticationException() {
    super(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());
  }

  public AuthenticationException(Throwable cause) {
    super(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase(), cause);
  }
}
