package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class Dates {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "date_id")
  private int id;

  @Column(name = "date")
  @Temporal(TemporalType.DATE)
  @JsonBackReference
  private Date tripDate;


  @ManyToMany(mappedBy = "datesList")
  private List<Trip> trips;

}
