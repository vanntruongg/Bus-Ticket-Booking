package obtbms.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "location")
public class Location {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "location_id")
  private int locationId;
  @Column(name = "location_name")
  private String locationName;
  @Column(name = "location_code")
  private String locationCode;

  @OneToMany(mappedBy = "location")
  @JsonIgnore
  private List<RoutePoint> points = new ArrayList<>();
}
