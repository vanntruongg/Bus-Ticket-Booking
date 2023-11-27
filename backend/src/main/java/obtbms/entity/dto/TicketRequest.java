package obtbms.entity.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TicketRequest {
  private String fullName;
  private String phone;
  private String email;
  private String notes;
  private List<TripRequest> tripRequests;
  private Boolean isReturn;
}
