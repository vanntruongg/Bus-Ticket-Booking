package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.constant.MessageConstant;
import obtbms.entity.Dates;
import obtbms.exception.DuplicationException;
import obtbms.exception.ErrorCode;
import obtbms.repository.DatesRepository;
import obtbms.service.DatesService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DatesServiceImpl implements DatesService {
  private final DatesRepository datesRepository;

  @Override
  public Dates createDate(Date date) {
    Optional<Dates> dates = datesRepository.findDatesByTripDate(date);
    if (dates.isEmpty()) {
      Dates datesCreate = new Dates();
      datesCreate.setTripDate(date);
      datesRepository.save(datesCreate);
      return datesCreate;
    } else {
      throw new DuplicationException(ErrorCode.NOT_NULL, MessageConstant.EXISTED);
    }
  }
}
