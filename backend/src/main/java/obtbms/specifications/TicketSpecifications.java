package obtbms.specifications;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import obtbms.entity.Ticket;
import obtbms.entity.User;
import obtbms.enums.TicketStatus;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TicketSpecifications {
  public Specification<Ticket> filterTickets(String queryType, Date currentDate, TicketStatus status, String email) {
    return (root, query, builder) -> {
      Predicate predicate = builder.conjunction();

      if (queryType != null) {
        if (queryType.equals("newly_purchased")) {
          predicate = builder.and(predicate, builder.greaterThanOrEqualTo(root.get("tripDate"), currentDate));
        } else if (queryType.equals("purchased_successfully")) {
          predicate = builder.and(predicate, builder.lessThan(root.get("tripDate"), currentDate));
        }
      }

      if (status != null) {
        predicate = builder.and(predicate, builder.equal(root.get("status"), status));
      }
      if (!email.isEmpty()) {
//        Join<Ticket, User> userJoin = root.join("user");
        predicate = builder.and(predicate, builder.equal(root.get("user").get("email"), email));
      }

      return predicate;
    };
  }
}
