package obtbms.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import obtbms.entity.dto.*;

public interface AuthService {
  LoginResponse login(LoginRequest loginRequest);
  boolean logout(HttpServletRequest request, HttpServletResponse response);
  LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
