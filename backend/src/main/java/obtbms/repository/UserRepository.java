package obtbms.repository;

import obtbms.entity.User;
import obtbms.enums.AccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findUserByPhone(String phone);

  List<User> findAllByStatus(AccountStatus status);

  @Query("SELECT COUNT(u) FROM User u WHERE u.status = 1")
  int countTotalUsers();
}
