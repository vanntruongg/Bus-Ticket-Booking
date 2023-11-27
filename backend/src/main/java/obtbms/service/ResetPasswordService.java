package obtbms.service;

public interface ResetPasswordService {
  boolean isExpired(long expirationTimeMillis);
  void cleanUpExpiredTokenResetPassword();
}
