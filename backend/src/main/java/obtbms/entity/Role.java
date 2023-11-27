package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "role")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "role_id", nullable = false, unique = true, updatable = false)
  private Integer id;
  @Column(name = "role_name")
  private String roleName;

  @JsonIgnore
  @ManyToMany(mappedBy = "roles")
  private List<User> users;
}
