import { searchTrip } from '@/services/apiUtils';
import {
  setFrom,
  setFromTime,
  setIsReturn,
  setTo,
  setToTime,
} from '@/redux/tripSlice';
import { getCurrentDateFormatted } from '@/utils/dateUtils';
import { formatVND } from '@/utils/stringUtils';
import { useSelector } from 'react-redux';

const PopularRouteCard = ({
  navigate,
  dispatch,
  fromName,
  img,
  dataRoutesPopular,
}) => {
  const { from, to, fromTime, toTime, isReturn } = useSelector(
    (state) => state.trip,
  );
  const handleSearchTrip = (trip) => {
    dispatch(
      setFrom({
        locationName: trip.originId.locationName,
        locationCode: trip.originId.locationCode,
      }),
    );
    dispatch(
      setTo({
        locationName: trip.destinationId.locationName,
        locationCode: trip.destinationId.locationCode,
      }),
    );
    dispatch(setFromTime(getCurrentDateFormatted()));
    dispatch(setToTime(''));
    dispatch(setIsReturn(false));

    searchTrip(dispatch, navigate, from, to, fromTime, toTime, isReturn);
  };
  return (
    <div className="bg-white border rounded-xl animate-fadeInToTop">
      <div style={{}} className={``}>
        <img src={img} alt="" className="max-h-[122px] w-full rounded-lg" />
        <div className="text-white absolute -translate-y-14 translate-x-2">
          <span>Tuyến xe từ</span>
          <h4 className="text-20 font-semibold">{fromName}</h4>
        </div>
      </div>
      <ul className="">
        {dataRoutesPopular?.map((trip) => (
          <li
            key={trip.routeId}
            className="p-4 border-b cursor-pointer"
            onClick={() => handleSearchTrip(trip)}
          >
            <div className="flex justify-between">
              <h4 className="text-primary-blue-700 font-medium">
                {trip.destinationId.locationName}
              </h4>
              <span className="font-medium">{formatVND(trip.price)}</span>
            </div>
            <span className="text-gray-500 text-14 font-openSans">
              {`${trip.routeLength}  -  ${
                trip.journeyDuration
              }  -  ${getCurrentDateFormatted()}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularRouteCard;
