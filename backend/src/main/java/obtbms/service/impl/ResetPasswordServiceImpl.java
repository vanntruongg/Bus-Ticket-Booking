package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.entity.ResetPassword;
import obtbms.repository.ResetPasswordRepository;
import obtbms.service.ResetPasswordService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResetPasswordServiceImpl implements ResetPasswordService {

  private final ResetPasswordRepository resetPasswordRepository;
  @Override
  public boolean isExpired(long expirationTimeMillis) {
    long currentTimeMillis = System.currentTimeMillis();
    return currentTimeMillis > expirationTimeMillis;
  }

  @Override
  @Scheduled(fixedRate = 86400000) // run once a day
  public void cleanUpExpiredTokenResetPassword() {
    long currentTime = System.currentTimeMillis();
    // get all token expired & delete them
    List<ResetPassword> expiredTokens = resetPasswordRepository.findAllByExpirationTimeLessThan(currentTime);
    resetPasswordRepository.deleteAll(expiredTokens);
  }
}
