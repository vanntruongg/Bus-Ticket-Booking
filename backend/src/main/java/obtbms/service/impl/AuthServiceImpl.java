package obtbms.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import obtbms.constant.MessageConstant;
import obtbms.entity.dto.LoginRequest;
import obtbms.entity.dto.LoginResponse;
import obtbms.entity.dto.RefreshTokenRequest;
import obtbms.enums.AccountStatus;
import obtbms.repository.UserRepository;
import obtbms.security.JwtService;
import obtbms.security.UserDetailsImpl;
import obtbms.security.UserDetailsServiceImpl;
import obtbms.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  private final UserDetailsServiceImpl userDetailsService;
  private final UserRepository userRepository;

  @Override
  public LoginResponse login(LoginRequest loginRequest) {
    var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),  loginRequest.getPassword())
    );
    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

    if(userPrincipal.getStatus().equals(AccountStatus.DISABLE)) {
      throw new DisabledException(MessageConstant.ACCOUNT_DISABLE);
    }
    String accessToken = jwtService.generateAccessToken(userPrincipal);
    String refreshToken = jwtService.generateRefreshToken(userPrincipal);
    return LoginResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
  }

  @Override
  public boolean logout(HttpServletRequest request, HttpServletResponse response) {
    var auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null) {
      return false;
    }
    UserDetailsImpl userDetail = null;
     if(auth instanceof UserDetailsImpl) {
       userDetail = (UserDetailsImpl) auth.getPrincipal();
     }
    if (userDetail != null) {
      new SecurityContextLogoutHandler().logout(request, response, auth);
      SecurityContextHolder.getContext().setAuthentication(null);
      auth.setAuthenticated(false);
      return true;
    }
    return false;
  }

  @Override
  public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
    String refreshToken = refreshTokenRequest.getRefreshToken();
    if (!jwtService.validateToken(refreshToken)) {
      throw new BadCredentialsException("Invalid refresh token!");
    }

    String email = jwtService.getEmailFromToken(refreshToken);
    UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(email);

    String accessToken = jwtService.generateAccessToken(userDetails);
    return LoginResponse.builder()
            .accessToken(accessToken)
            .build();
  }


}
