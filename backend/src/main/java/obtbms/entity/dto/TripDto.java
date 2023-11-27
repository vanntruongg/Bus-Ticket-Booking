package obtbms.entity.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;
import obtbms.config.CustomTimeSerializer;

import java.sql.Time;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TripDto {
  private int tripId;
  private float tripPrice;
  private String tripJourneyDuration;
  @JsonSerialize(using = CustomTimeSerializer.class)
  private Time tripDepartureTime;
  @JsonSerialize(using = CustomTimeSerializer.class)
  private Time tripArrivalTime;
  private String tripDate;
  private String tripFromLocation;
  private String tripToLocation;
  private String tripBusType;
  private int tripSeatsAvailable;
}
