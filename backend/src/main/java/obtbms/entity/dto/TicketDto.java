package obtbms.entity.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;
import obtbms.config.CustomTimeSerializer;
import obtbms.entity.RoutePoint;
import obtbms.entity.Trip;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TicketDto {
  private String ticketId;
  private String fullName;
  private String phone;
  private String email;
  private Float totalPrice;
  private String paymentMethod;
  private String status;
  private String route;
  @JsonSerialize(using = CustomTimeSerializer.class)
  private Time departureTime;
  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  private Date tripDate;
  private List<String> seatCode;
  private RoutePoint routePoint;
  private Float fare;
  private String licensePlate;
  private String notes;
}
