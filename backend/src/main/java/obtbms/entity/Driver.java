package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "driver")
public class Driver {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "driver_id")
  private int driverId;
  @Column(name = "driver_license")
  private String driverLicense;

  @OneToOne
  @JoinColumn(name = "email")
  private User user;

  @ManyToMany
  @JoinTable(name = "driver_bus",
          joinColumns = @JoinColumn(name = "driver_id"),
          inverseJoinColumns = @JoinColumn(name = "bus_id")
  )
  @JsonIgnore
  private List<Bus> listBus = new ArrayList<>();

}
