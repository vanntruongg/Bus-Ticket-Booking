package obtbms.repository;

import obtbms.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {

  Location findLocationByLocationCode(String locationCode);
}
