package obtbms.repository;

import obtbms.entity.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResetPasswordRepository extends JpaRepository<ResetPassword, Integer> {
  Optional<ResetPassword> findByToken(String token);
  List<ResetPassword> findAllByExpirationTimeLessThan(long currentTime);
}
