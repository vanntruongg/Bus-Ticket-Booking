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
@Table(name = "bus")
public class Bus {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "bus_id")
  private int busId;
  @Column(name = "license_plate")
  private String licensePlate;
  @Column(name = "brand")
  private String brand;

  @ManyToOne
  @JoinColumn(name = "type_id")
  private BusType busType;

  @ManyToMany(mappedBy = "listBus")
  @JsonIgnore
  private List<Driver> listDriver;
}
