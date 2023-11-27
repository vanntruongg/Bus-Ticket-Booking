package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;
import obtbms.config.CustomTimeSerializer;

import java.io.Serializable;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "trip")
public class Trip {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "trip_id")
  private int tripId;

  @JsonSerialize(using = CustomTimeSerializer.class)
  @Column(name = "departure_time")
  private Time departureTime;

  @ManyToOne
  @JoinColumn(name = "route_id")
  private Route route;

  @ManyToOne
  @JoinColumn(name = "bus_id")
  private Bus bus;

  @ManyToMany
  @JoinTable(name = "trip_date",
    joinColumns = @JoinColumn(name = "trip_id"),
          inverseJoinColumns = @JoinColumn(name = "date_id")
  )
  @JsonIgnore
  private List<Dates> datesList = new ArrayList<>();

  @OneToMany(mappedBy = "trip")
  @JsonBackReference
  private List<Ticket> tickets = new ArrayList<>();
}

