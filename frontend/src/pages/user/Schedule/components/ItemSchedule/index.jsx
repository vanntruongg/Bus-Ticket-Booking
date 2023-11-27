import { CgArrowRight } from 'react-icons/cg';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getCurrentDateFormatted } from '@/utils/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFrom,
  setFromTime,
  setIsReturn,
  setTo,
  setToTime,
} from '@/redux/tripSlice';
import { searchTrip } from '@/services/apiUtils';
const ItemSchedule = ({ schedule }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { from, to, fromTime, toTime, isReturn } = useSelector(
    (state) => state.trip,
  );

  const handleSearchRoute = (
    originName,
    originCode,
    destinationName,
    destinationCode,
  ) => {
    dispatch(
      setFrom({
        locationName: originName,
        locationCode: originCode,
      }),
    );
    dispatch(
      setTo({
        locationName: destinationName,
        locationCode: destinationCode,
      }),
    );
    dispatch(setFromTime(getCurrentDateFormatted()));
    dispatch(setToTime(''));
    dispatch(setIsReturn(false));

    searchTrip(dispatch, navigate, from, to, fromTime, toTime, isReturn);
  };
  return (
    <Row className=" my-1.5">
      <Col span={6} className=" flex items-center gap-2">
        <span className="text-primary-500">
          {schedule.originId.locationName}
        </span>
        <CgArrowRight />
        <span className="">{schedule.destinationId.locationName}</span>
      </Col>
      <Col span={2} className="">
        {schedule.busType}
      </Col>
      <Col span={3} className="">
        {schedule.routeLength}
      </Col>
      <Col span={4} className="">
        {schedule.journeyDuration}
      </Col>
      <Col span={2} className="">
        {schedule.priceTicket ? schedule.priceTicket : '---'}
      </Col>
      <Col span={2} className=""></Col>
      <Col className="flex justify-end">
        <button
          className="text-primary-500 px-4 py-0.5 outline-none border border-primary-500 rounded-lg transition-all duration-200 hover:bg-primary-500 hover:text-white"
          onClick={() =>
            handleSearchRoute(
              schedule.originId.locationName,
              schedule.originId.locationCode,
              schedule.destinationId.locationName,
              schedule.destinationId.locationCode,
            )
          }
        >
          <span className="text-14">Tìm tuyến xe</span>
        </button>
      </Col>
    </Row>
  );
};

export default ItemSchedule;
