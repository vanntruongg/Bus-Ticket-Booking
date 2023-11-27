package obtbms.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "route")
public class Route {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "route_id")
  private int routeId;
  @Column(name = "journey_duration")
  private String journeyDuration;

  @Column(name = "route_length")
  private String routeLength;

  @Column(name = "price")
  private Float price;

  @ManyToOne
  @JoinColumn(name = "origin_id")
  private Location originId;

  @ManyToOne
  @JoinColumn(name = "destination_id")
  private Location destinationId;

}
