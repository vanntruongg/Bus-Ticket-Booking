package obtbms.entity.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import obtbms.config.CustomTimeSerializer;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TripRequestDto {
  private int tripId;
  @NotNull
  private int routeId;
  @NotNull
  private int busId;
  @NotNull
  @JsonSerialize(using = CustomTimeSerializer.class)
  private Time departureTime;
  @NotNull
  @JsonFormat(pattern = "dd-MM-yyyy", timezone = "Asia/Ho_Chi_Minh")
  @Temporal(TemporalType.DATE)
  private Date tripDate;
}
