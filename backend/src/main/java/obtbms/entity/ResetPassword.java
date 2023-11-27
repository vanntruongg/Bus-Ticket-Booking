package obtbms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "reset_password")
public class ResetPassword {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "reset_pwd_id")
  private int id;
  @Column(name = "reset_pwd_token")
  private String token;
  @Column(name = "expiration_time")
  private long expirationTime;

  @ManyToOne
  @JoinColumn(name = "email")
  private User user;
}
