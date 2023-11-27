import { Empty, Radio, Spin } from 'antd';
import { FaRegTimesCircle } from 'react-icons/fa';
import Trip from '@/components/Trip';
import { useLocation } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
import useSearchParameters from '@/hooks/useSearchParameters';
import SearchTrip from '../Home/components/SearchTrip';
import { optionsBusType } from '@/resources/dataDefault';
import dayjs from 'dayjs';

const ListSearchTrip = () => {
  console.log('Re-render Search Trip');
  const location = useLocation();
  const [trips, setTrips] = useState([]);
  const fromName = location.state.from || [];
  const toName = location.state.to || [];
  const [filterByTime, setFilterByTime] = useState('');
  const [filterByBusType, setFilterByBusType] = useState('');
  const [tripDataIsShowing, setTripDataIsShowing] = useState(0); // trip = 0, roundTrip = 1

  const [classReturnTrip, setClassReturnTrip] = useState('left-0');
  // lưu data sau khi filter
  const [tripsFiltered, setTripsFiltered] = useState(trips);
  const [loading, setLoading] = useState(false);
  const { from, to, fromTime, toTime, isReturn } = useSearchParameters();

  useEffect(() => {
    setTrips(location.state.trips.trip || []);
    setTripsFiltered(location.state.trips.trip || []);
  }, [location]);

  useEffect(() => {
    // lay from and to tu valueFilter
    const [from, to] = filterByTime.split(' - ');
    const currenDate = dayjs();
    const currentDay = currenDate.format('DD-MM-YYYY');
    const currentTime = currenDate.format('HH:mm');

    const dataTripFiltered = trips.filter((trip) => {
      const isWithinTimeRange =
        filterByTime === '' ||
        (trip.tripDepartureTime >= from && trip.tripDepartureTime <= to);
      const isMatchingBusType =
        filterByBusType === '' || trip.tripBusType === filterByBusType;

      if (tripDataIsShowing === 1) {
        return toTime <= currentDay
          ? trip.tripDepartureTime > currentTime &&
              isWithinTimeRange &&
              isMatchingBusType
          : isWithinTimeRange && isMatchingBusType;
      } else {
        return fromTime <= currentDay
          ? trip.tripDepartureTime > currentTime &&
              isWithinTimeRange &&
              isMatchingBusType
          : isWithinTimeRange && isMatchingBusType;
      }
    });

    setTripsFiltered(dataTripFiltered);
  }, [trips, filterByTime, filterByBusType]);

  const hanleGetDataTrip = () => {
    if (tripDataIsShowing === 0) {
      return;
    }
    setClassReturnTrip('left-0');
    setTripDataIsShowing(0);
    setLoading(true);
    // fake callback API
    setTimeout(() => {
      setTrips(location.state.trips.trip);
      setLoading(false);
    }, 500);
  };

  const hanleGetDataReturnTrip = () => {
    if (tripDataIsShowing === 1) {
      return;
    }
    setClassReturnTrip('translate-x-[100%]');
    setTripDataIsShowing(1);
    setLoading(true);
    // fake callback API
    setTimeout(() => {
      setTrips(location.state.trips.roundTrip);
      setLoading(false);
    }, 500);
  };
  const handleClearFilter = () => {
    setFilterByTime('');
    setFilterByBusType('');
  };
  return (
    <>
      <SearchTrip />
      <div className="grid grid-cols-3 gap-8 p-4 pb-6 my-8 mx-16 bg-white border rounded-md">
        <div className="col-span-2">
          <h4 className="text-20 font-bold pb-4">{`${fromName} - ${toName}`}</h4>
          {isReturn === 'true' && (
            <div className="flex flex-col justify-between my-6 border-b">
              <div className="flex">
                <button
                  className="w-full py-2 uppercase font-medium"
                  onClick={hanleGetDataTrip}
                >{`Chuyến đi - ${fromTime}`}</button>
                <button
                  className="w-full py-2 uppercase font-medium"
                  onClick={hanleGetDataReturnTrip}
                >{`Chuyến về - ${toTime}`}</button>
              </div>
              <span
                className={`bottom-0 w-[50%] h-1 rounded-full bg-primary-500 transition-all duration-300 ${classReturnTrip}`}
              ></span>
            </div>
          )}
          {loading ? (
            <div className="min-h-[400px] flex justify-center items-center text-primary-700">
              <Spin color="currentColor" />
            </div>
          ) : (
            <div className="min-h-[400px]">
              {tripsFiltered.length > 0 ? (
                tripsFiltered.map((trip) => (
                  <Trip
                    key={trip.tripId}
                    dataTrip={trip}
                    hanleGetDataReturnTrip={hanleGetDataReturnTrip}
                    hanleGetDataTrip={hanleGetDataTrip}
                    searchString={location.state.searchString}
                    tripDataIsShowing={tripDataIsShowing}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center min-h-[400px]">
                  <Empty
                    description={'Không tìm thấy kết quả'}
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <div className=" bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between my-2 mb-6">
            <h4 className="text-20">Bộ lọc tìm kiếm</h4>
            <button
              className="flex items-center hover:text-red-500"
              onClick={handleClearFilter}
            >
              <span>Bỏ lọc</span>
              <FaRegTimesCircle className="mt-1 mx-1" />
            </button>
          </div>
          <div className="">
            <div className="">
              <span>Giờ đi:</span>
              <Radio.Group
                value={filterByTime}
                onChange={(e) => setFilterByTime(e.target.value)}
                className="ml-4"
              >
                <Radio
                  value={'00:00 - 06:00'}
                  className="checked:bg-purple-500 my-1 text-16"
                >
                  Sáng sớm 00:00 - 06:00
                </Radio>
                <Radio
                  value={'06:00 - 12:00'}
                  className="checked:text-purple-500 my-1 text-16"
                >
                  Buổi sáng 06:00 - 12:00
                </Radio>
                <Radio
                  value={'12:00 - 18:00'}
                  className="checked:text-purple-500 my-1 text-16"
                >
                  Buổi chiều 12:00 - 18:00
                </Radio>
                <Radio
                  value={'18:00 - 24:00'}
                  className="checked:text-purple-500 my-1 text-16"
                >
                  Buổi tối 18:00 - 24:00
                </Radio>
              </Radio.Group>
            </div>
            <div className="">
              <span>Loại xe:</span>
              <br></br>
              <Radio.Group
                options={optionsBusType}
                onChange={(e) => setFilterByBusType(e.target.value)}
                value={filterByBusType}
                optionType="button"
                className="ml-4 my-1"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ListSearchTrip);
