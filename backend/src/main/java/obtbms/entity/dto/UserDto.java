package obtbms.entity.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Getter
public class UserDto {
  @NotBlank
  private String email;
  @NotBlank
  private String firstName;
  @NotBlank
  private String lastName;
  private String phone;
  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  private Date birthday;
  private String address;
  private String imgUrl;
  private String password;
  private List<Integer> roles;

}
