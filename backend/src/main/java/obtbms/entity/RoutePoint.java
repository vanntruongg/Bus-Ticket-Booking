package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "route_point")
public class RoutePoint {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "point_id")
  private int pointId;
  @Column(name = "point_name")
  private String pointName;
  @Column(name = "address_detail")
  private String addressDetail;
  @Column(name = "link_gg_map")
  private String linkGoogleMap;

  @ManyToOne
  @JoinColumn(name = "location_id")
  @JsonBackReference
  private Location location;
}
