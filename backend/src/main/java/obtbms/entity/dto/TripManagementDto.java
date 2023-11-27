package obtbms.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;
import obtbms.config.CustomTimeSerializer;
import obtbms.entity.Bus;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TripManagementDto {
  private int tripId;
  private int routeId;
  private Bus bus;
  @JsonSerialize(using = CustomTimeSerializer.class)
  private Time departureTime;
  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  private Date tripDate;
  private String originName;
  private String destinationName;
  private String driverName;
  private String busLicensePlate;
}
