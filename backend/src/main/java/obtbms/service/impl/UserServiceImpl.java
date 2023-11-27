package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.common.StringUtils;
import obtbms.common.UploadFile;
import obtbms.constant.CommonConstant;
import obtbms.constant.MessageConstant;
import obtbms.entity.ResetPassword;
import obtbms.entity.Role;
import obtbms.entity.User;
import obtbms.entity.dto.ChangePasswordRequest;
import obtbms.entity.dto.ResetPasswordRequest;
import obtbms.entity.dto.UserDto;
import obtbms.enums.AccountStatus;
import obtbms.exception.*;
import obtbms.repository.ResetPasswordRepository;
import obtbms.repository.UserRepository;
import obtbms.security.SecurityContextHelper;
import obtbms.service.ResetPasswordService;
import obtbms.service.RoleService;
import obtbms.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final RoleService roleService;
  private final PasswordEncoder passwordEncoder;
  private final SecurityContextHelper securityContextHelper;
  private final MailServiceImpl mailService;
  private final ResetPasswordRepository resetPasswordRepository;
  private final ResetPasswordService resetPasswordService;

  @Override
  public Boolean createUser(UserDto userDto) {
    try {
      Optional<User> user = userRepository.findById(userDto.getEmail());
      if (user.isPresent() && user.get().getStatus().equals(AccountStatus.ACTIVE)) {
        throw new DuplicationException(ErrorCode.NOT_NULL, String.format(MessageConstant.CHAR_SEQUENCE_2, userDto.getEmail(), MessageConstant.REGISTERED));
      }
      List<Integer> roleIds;
      if (userDto.getRoles() != null) {
        roleIds = userDto.getRoles();
      } else {
        // neu khong co role -> nguoi dung dang ky role mac dinh la user, nhan vien dang ky thi phai truyen roles
        roleIds = new ArrayList<>();
        roleIds.add(3);
      }
      List<Role> roles = roleService.findAllRolesByIds(roleIds);
      User userCreate = User.builder()
              .email(userDto.getEmail())
              .firstName(userDto.getFirstName())
              .lastName(userDto.getLastName())
              .password(passwordEncoder.encode(userDto.getPassword()))
              .status(AccountStatus.ACTIVE)
              .roles(roles)
              .build();
      userRepository.save(userCreate);
      return true;
    } catch (DuplicationException exception) {
      throw new DuplicationException(ErrorCode.NOT_FOUND, MessageConstant.EMAIL_EXISTED, exception);
    }
  }

  @Override
  public Boolean createdByAdmin(UserDto userDto) {
    try {
      Optional<User> userOptional = userRepository.findById(userDto.getEmail());

      if (userOptional.isPresent() && userOptional.get().getStatus().equals(AccountStatus.ACTIVE)) {
        throw new DuplicationException(ErrorCode.NOT_NULL, String.format(MessageConstant.CHAR_SEQUENCE_2, userDto.getEmail(), MessageConstant.REGISTERED));
      }
      List<Integer> roleIds = new ArrayList<>();
      if (userDto.getRoles() != null) {
        roleIds = userDto.getRoles();
      }
      List<Role> roles = roleService.findAllRolesByIds(roleIds);
      String password = StringUtils.generatePassword();
      User user = new User();
      setUser(userDto, user);
      user.setRoles(roles);
      user.setPassword(passwordEncoder.encode(password));
      user.setStatus(AccountStatus.ACTIVE);
      userRepository.save(user);

      mailService.sendMail(user.getEmail(), password);

      return true;
    } catch (Exception exception) {
      throw new DuplicationException(ErrorCode.NOT_NULL, MessageConstant.EMAIL_EXISTED, exception.getCause());
    }
  }

  @Override
  public Boolean updateUser(UserDto userDto) {
    try {
      Optional<User> userOptional = userRepository.findById(userDto.getEmail());
      if (userOptional.isPresent()) {
        User userUpdate = userOptional.get();

        userUpdate.setImgUrl(userDto.getImgUrl());
       setUser(userDto, userUpdate);

        userRepository.save(userUpdate);
        return true;
      } else {
        throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND);
      }
    } catch (Exception exception) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, exception.getCause());
    }
  }

  @Override
  public Boolean updatedByAdmin(UserDto userDto) {
    try {
      Optional<User> userOptional = userRepository.findById(userDto.getEmail());
      if (userOptional.isPresent()) {
        List<Integer> roleIds = userDto.getRoles();
        List<Role> roles = roleService.findAllRolesByIds(roleIds);
        User userUpdate = userOptional.get();
        setUser(userDto, userUpdate);
        userUpdate.setRoles(roles);
        userRepository.save(userUpdate);
        return true;
      } else {
        return false;
      }
    } catch (Exception exception) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, exception.getCause());
    }
  }

  private void setUser(UserDto userDto, User userUpdate) {
    userUpdate.setEmail(userDto.getEmail());
    userUpdate.setLastName(userDto.getLastName());
    userUpdate.setFirstName(userDto.getFirstName());
    userUpdate.setPhone(userDto.getPhone());
    userUpdate.setBirthday(userDto.getBirthday());
    userUpdate.setAddress(userDto.getAddress());
  }

  @Override
  public List<User> getAllUser() {
    return userRepository.findAll();
  }

  @Override
  public long countUsers() {
    return userRepository.count();
  }

  @Override
  public boolean changePassword(ChangePasswordRequest request) {
    User user = userRepository.findById(request.getEmail()).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
    if (passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
      user.setPassword(passwordEncoder.encode(request.getNewPassword()));
      userRepository.save(user);
      return true;
    }
    throw new OldPassIncorrectException(ErrorCode.OLD_PASSWORD_INCORRECT, MessageConstant.OLD_PASSWORD_INCORRECT);
  }

  @Override
  @Transactional
  public AccountStatus disableAccount(String email) {
    User user = userRepository.findById(email).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
    try {
      AccountStatus status = user.getStatus() == AccountStatus.DISABLE ? AccountStatus.ACTIVE : AccountStatus.DISABLE;
      user.setStatus(status);
      userRepository.save(user);
      return status;
    } catch (NotFoundException ex) {
      throw new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND, ex.getCause());
    }
  }

  @Override
  public User getUser() {
    var userId = securityContextHelper.getUserId();
    return userRepository.findById(userId).orElseThrow(() ->
            new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
  }

  @Override
  public Boolean forgotPassword(String email) {
    User user = userRepository.findById(email).orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.USER_NOT_FOUND));
    String token = RandomStringUtils.randomAlphanumeric(32);
    ResetPassword resetPassword = ResetPassword.builder()
            .token(token)
            .expirationTime(System.currentTimeMillis() + 300000) // lay thoi gian hien tai + 300000 milisecond (5phut)
            .user(user)
            .build();
    resetPasswordRepository.save(resetPassword);

    String url = "http://localhost:3030/dat-lai-mat-khau" + "?token=" + token;
    mailService.sendMail(user, url);
    return true;
  }

  @Override
  public Boolean resetPassword(ResetPasswordRequest request) {
    try {
      ResetPassword resetPassword = resetPasswordRepository.findByToken(request.getToken())
              .orElseThrow(() -> new NotFoundException(ErrorCode.NOT_FOUND, MessageConstant.TOKEN_INVALID));
      if (resetPasswordService.isExpired(resetPassword.getExpirationTime())) {
        throw new ExpiredException(ErrorCode.EXPIRED, MessageConstant.TOKEN_EXPIRED);
      }

      User user = resetPassword.getUser();
      user.setPassword(passwordEncoder.encode(request.getNewPassword()));
      userRepository.save(user);

      resetPasswordRepository.delete(resetPassword);
      return true;

    } catch (ExpiredException exception) {
      throw new ExpiredException(ErrorCode.EXPIRED, MessageConstant.TOKEN_EXPIRED, exception);
    }
  }


}
