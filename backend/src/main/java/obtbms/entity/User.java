package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import obtbms.enums.AccountStatus;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder(toBuilder = true)
@Entity
@Table(name = "user")
public class User {
  @Id
  @Column(name = "email", nullable = false, unique = true, updatable = false)
  private String email;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "phone", unique = true)
  private String phone;

  @Column(name = "birthday")
  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  private Date birthday;

  @Column(name = "address")
  private String address;

  @Column(name = "img_url")
  private String imgUrl;

  @JsonIgnore
  @Column(name = "password")
  private String password;

  @Column(name = "status")
  private AccountStatus status;
  @Builder.Default
  @JsonManagedReference
  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "role_user",
          joinColumns = @JoinColumn(name = "email_user"),
          inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private List<Role> roles = new ArrayList<>();
}
