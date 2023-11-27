package obtbms.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class BusType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "type_id")
  private int busTypeId;
  @Column(name = "type_name")
  private String busTypeName;
  @Column(name = "seat_count")
  private int seatCount;
}
