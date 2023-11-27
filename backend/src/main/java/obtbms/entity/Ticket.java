package obtbms.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import obtbms.enums.TicketStatus;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "ticket")
public class Ticket {

  @Id
  @Column(name = "ticket_id")
  private String ticketId;

  @Column(name = "total_price")
  private Float totalPrice;
  @Column(name = "notes")
  private String note;

  @Column(name = "payment_method")
  private String paymentMethod;

  @Column(name = "status")
  @Enumerated(EnumType.STRING)
  private TicketStatus status;

  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  @Column(name = "booking_date")
  private Date bookingDate;

  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  @Column(name = "trip_date")
  private Date tripDate;

  @ManyToOne
  @JoinColumn(name = "email")
  private User user;

  @ManyToOne
  @JoinColumn(name = "trip_id")
  @JsonManagedReference
  private Trip trip;

  @ManyToOne
  @JoinColumn(name = "pick_up_location")
  private RoutePoint routePoint;

  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JoinTable(name = "ticket_seat",
          joinColumns = @JoinColumn(name = "ticket_id"),
          inverseJoinColumns = @JoinColumn(name = "seat_id")
  )
  @JsonManagedReference
  private List<Seat> seats = new ArrayList<>();
}
