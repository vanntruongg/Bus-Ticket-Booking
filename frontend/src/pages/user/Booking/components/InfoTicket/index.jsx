import { formatVND } from '@/utils/stringUtils';
import { memo } from 'react';
import { CgArrowRight } from 'react-icons/cg';

const InfoTicket = ({ title, trip, tripInfo }) => {
  return (
    <div className="px-4 py-2 border rounded-md">
      <h3 className="text-20 font-medium py-2">{`Thông tin ${title}`}</h3>
      <div className="flex justify-between py-0.5">
        <span className="text-gray-500 text-[15px]">Tuyến xe</span>
        <div className="flex text-[15px] items-center gap-2 font-medium">
          <span>{tripInfo.tripFromLocation}</span>
          <CgArrowRight />
          <span>{tripInfo.tripToLocation}</span>
        </div>
      </div>
      <div className="flex justify-between py-0.5">
        <span className="text-gray-500 text-[15px]">Thời gian</span>
        <span className="text-[15px] font-medium text-primary-blue-500">
          {`${tripInfo.tripDepartureTime} ${tripInfo.tripDate}`}
        </span>
      </div>
      <div className="flex justify-between py-0.5">
        <span className="text-gray-500 text-[15px]">Số lượng ghế</span>
        <span className="text-[15px] font-medium">{trip.seats} Ghế</span>
      </div>
      <div className="flex justify-between py-0.5">
        <span className="text-gray-500 text-[15px]">Số ghế</span>
        <span className="text-[15px] flex gap-1 justify-end float-right font-medium ">
          {trip.seatsCode
            ? trip.seatsCode.map((seatCode, index) => {
                if (index < trip.seatsCode.length - 1) {
                  seatCode += ',';
                }
                return (
                  <div key={seatCode} className="">
                    {seatCode}
                  </div>
                );
              })
            : ''}
        </span>
      </div>
      <div className="flex justify-between py-0.5">
        <span className="text-gray-500 text-[15px]">{`Tổng tiền ${title}`}</span>
        <span className="text-[15px] font-medium text-primary-purple-500">
          {formatVND(trip.seats * tripInfo.tripPrice)}
        </span>
      </div>
    </div>
  );
};

export default memo(InfoTicket);
