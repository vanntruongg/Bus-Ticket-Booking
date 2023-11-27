import { Popover, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { RiArrowDownSLine } from 'react-icons/ri';

import PickUpDropOff from '@/pages/user/Booking/components/PickUpDropOff';
import { memo, useEffect, useMemo, useState } from 'react';
import { setPickUp } from '@/redux/roundTripTicketSlice';

const PickUpDropOffInfo = ({
  desTrip,
  dateTrip,
  pickUpChange,
  dataRoutePoints,
}) => {
  const { from, to, fromTime, toTime, isReturn } = useSelector(
    (state) => state.trip,
  );
  const dispatch = useDispatch();
  const [pickUpValue, setPickUpValue] = useState(
    dataRoutePoints.routePointOrigin[0],
  );
  const [dropOffValue, setDropOffValue] = useState(
    dataRoutePoints.routePointDestination[0],
  );

  useEffect(() => {
    pickUpChange(pickUpValue);
  }, [pickUpValue]);

  const handleChangePickUpLocation = (value) => {
    setPickUpValue(value);
  };
  const handleChangeDropOffLocation = (value) => {
    setDropOffValue(value);
  };

  console.log('Re-render PickUp DropOff');
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col text-20">
        <h3 className="font-medium">Thông tin đón trả</h3>
        {isReturn && (
          <span className="text-14">{`${desTrip} - ${dateTrip}`}</span>
        )}
      </div>
      <div className={`flex mt-6 ${isReturn ? 'flex-col gap-2' : 'gap-6'}`}>
        <div className={`flex flex-1 flex-col gap-4 `}>
          <span className="uppercase font-medium text-base">Điểm đón</span>
          <Space wrap>
            <Popover
              placement="bottom"
              content={
                <PickUpDropOff
                  dataRoutePoints={dataRoutePoints.routePointOrigin}
                  handleChangeSelect={handleChangePickUpLocation}
                />
              }
              trigger={'click'}
            >
              <div
                className={`flex justify-between items-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50 `}
              >
                <span>{pickUpValue.pointName}</span>
                <RiArrowDownSLine size={24} className="text-gray-400" />
              </div>
            </Popover>
          </Space>
        </div>
        <div className="w-[1px] border-r"></div>
        <div className="flex flex-1 flex-col gap-4">
          <span className="uppercase font-medium text-base">Điểm trả</span>
          <Space wrap>
            <Popover
              placement="bottom"
              content={
                <PickUpDropOff
                  dataRoutePoints={dataRoutePoints.routePointDestination}
                  handleChangeSelect={handleChangeDropOffLocation}
                />
              }
              trigger={'click'}
            >
              <div
                className={`flex justify-between items-center px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50 `}
              >
                <span className="">{dropOffValue.pointName}</span>
                <RiArrowDownSLine size={24} className="text-gray-400" />
              </div>
            </Popover>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default memo(PickUpDropOffInfo);
