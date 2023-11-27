package obtbms.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "seat")
public class Seat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "seat_id")
  private int seatId;
  @Column(name = "seat_code")
  private String seatCode;
  @Column(name = "seat_status")
  private String seatStatus;

  @ManyToMany(mappedBy = "seats")
  @JsonBackReference
  private List<Ticket> tickets = new ArrayList<>();
}
