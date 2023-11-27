package obtbms.service;

import obtbms.entity.User;
import obtbms.entity.dto.ChangePasswordRequest;
import obtbms.entity.dto.FeedbackRequest;
import obtbms.entity.dto.ResetPasswordRequest;
import obtbms.entity.dto.UserDto;
import obtbms.enums.AccountStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

public interface UserService {
  Boolean createUser(UserDto userDto);

  User getUser();


  Boolean forgotPassword(String email);
  Boolean resetPassword(ResetPasswordRequest request);

  Boolean createdByAdmin(UserDto userDto);

  Boolean updateUser(UserDto userDto);

  Boolean updatedByAdmin(UserDto userDto);

  List<User> getAllUser();

  long countUsers();

  boolean changePassword(ChangePasswordRequest request);

  AccountStatus disableAccount(String email);
}
