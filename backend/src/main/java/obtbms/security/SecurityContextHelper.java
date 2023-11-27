package obtbms.security;


import obtbms.exception.AuthenticationException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component(value = "securityContextHelper")
public class SecurityContextHelper {

  private UserDetailsImpl getUserDetails() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
      return (UserDetailsImpl) authentication.getPrincipal();
    }
    throw new AuthenticationException();
  }

  public String getUserId() {
    UserDetailsImpl userDetails = getUserDetails();
    if (userDetails != null) {
      return userDetails.getUsername();
    }
    throw new AuthenticationException();
  }

  public List<String> getRoles() {
    UserDetailsImpl userDetails = getUserDetails();
    if (userDetails != null) {
      return userDetails.getRole();
    }
    throw new AuthenticationException();
  }
}
