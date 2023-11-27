import { Divider } from 'antd';
import { MdLocationPin, MdTripOrigin } from 'react-icons/md';
import { setInfo } from '@/redux/roundTripTicketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatVND } from '@/utils/stringUtils';
import { memo } from 'react';

const Trip = ({
  dataTrip,
  searchString,
  hanleGetDataTrip,
  hanleGetDataReturnTrip,
  tripDataIsShowing,
}) => {
  console.log('re-render Trip');
  const { isReturn } = useSelector((state) => state.trip);
  const { trip, roundTrip } = useSelector((state) => state.roundTripTicket);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectTrip = (tripInfo) => {
    if (isReturn) {
      // đang ở mục chọn chuyến đi thì set from va nguoc lai
      if (tripDataIsShowing === 0) {
        dispatch(setInfo({ type: 'trip', info: tripInfo }));
        // nếu đã chọn chuyến về thì redirect sang đặt vé ngược lại chuyển sang chọn chuyến về
        roundTrip.tripInfo !== null
          ? navigate(`/dat-ve?${searchString}`)
          : hanleGetDataReturnTrip();
      } else {
        dispatch(setInfo({ type: 'roundTrip', info: tripInfo }));
        // nếu đã chọn chuyến đi thì redirect sang đặt vé ngược lại chuyển sang chọn chuyến đi
        trip.tripInfo !== null
          ? navigate(`/dat-ve?${searchString}`)
          : hanleGetDataTrip();
      }
    } else {
      dispatch(setInfo({ type: 'trip', info: tripInfo }));
      navigate(`/dat-ve?${searchString}`);
    }
  };
  return (
    <div className="p-4 my-2 border rounded-lg">
      <div className="flex justify-between gap-8 items-center">
        <span>{dataTrip.tripDepartureTime}</span>
        <div className="flex w-full items-center">
          <MdTripOrigin className="text-primary-500 mr-1" />
          <span className="flex-1 border-b-2 border-dotted"></span>
          <span className="text-center text-gray-500 leading-4">
            {dataTrip.tripJourneyDuration} <br></br>
            <span className="text-12">(Asian/Ho Chi Minh)</span>
          </span>
          <span className="flex-1 border-b-2 border-dotted"></span>
          <MdLocationPin className="text-primary-500 ml-1" />
        </div>
        <span>{dataTrip.tripArrivalTime}</span>
      </div>
      <div className="flex justify-between mt-2 font-semibold">
        <span>{dataTrip.tripFromLocation}</span>
        <span>{dataTrip.tripToLocation}</span>
      </div>
      <Divider className="my-4" />
      <div className="flex justify-between">
        <div className="flex items-center gap-2 text-14 text-gray-500">
          <span className="text-primary-500">
            {formatVND(dataTrip.tripPrice)}
          </span>
          <div className="w-[6px] h-[6px] rounded-full bg-primary-500"></div>
          <span className="text-primary-blue-500">{dataTrip.tripBusType}</span>
          <div className="w-[6px] h-[6px] rounded-full bg-primary-500"></div>
          <span className="text-primary-500">
            {dataTrip.tripSeatsAvailable}
          </span>
        </div>
        <button
          className="bg-primary-50 px-6 py-1.5 border border-primary-500 text-primary-500 text-14 rounded-lg transition-all duration-300 hover:bg-primary-500 hover:text-white font-semibold"
          onClick={() => handleSelectTrip(dataTrip)}
        >
          Chọn chuyến
        </button>
      </div>
    </div>
  );
};

export default memo(Trip);
