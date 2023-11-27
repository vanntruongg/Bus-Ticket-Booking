package obtbms.entity.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class ChangePasswordRequest {
  @NotBlank
  private String email;
  @NotBlank
  private String oldPassword;
  @NotBlank
  private String newPassword;
}
