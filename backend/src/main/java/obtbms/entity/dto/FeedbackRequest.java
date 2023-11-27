package obtbms.entity.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class FeedbackRequest {
  private String fullName;
  @NotBlank
  private String email;
  private String phone;
  private String title;
  @NotBlank
  private String content;
}
