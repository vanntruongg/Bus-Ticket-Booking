import SeatStatus from '../SeatStatus';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateBooking } from '@/utils/dateUtils';
import {
  setSeatCode,
  setSeats,
  settotalPrice,
} from '@/redux/roundTripTicketSlice';

import Seats from '../Seats';
import { memo, useEffect, useState } from 'react';
import { seatApi } from '@/services/seatApi';
import { Pinwheel } from '@uiball/loaders';
import { Spin } from 'antd';

const SeatSelection = () => {
  console.log('re-render Seat Selection');
  const { from, to, fromTime, toTime, isReturn } = useSelector(
    (state) => state.trip,
  );
  const { trip, roundTrip } = useSelector((state) => state.roundTripTicket);
  const [reservedSeatsTrip, setReservedSeatsTrip] = useState([]);
  const [reservedSeatsRoundTrip, setReservedSeatsRoundTrip] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReturn) {
      getReservedSeatsTrip();
    } else {
      getReservedSeatsRoundTrip();
    }
  }, []);

  const getReservedSeatsTrip = async () => {
    try {
      setIsLoading(true);
      const res = await seatApi.getAllSeatByTripId(
        trip.tripInfo.tripId,
        fromTime,
      );
      setReservedSeatsTrip(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getReservedSeatsRoundTrip = async () => {
    try {
      setIsLoading(true);
      const [reservedSeatsTrip, reservedSeatsRoundTrip] = await Promise.all([
        seatApi.getAllSeatByTripId(trip.tripInfo.tripId, fromTime),
        seatApi.getAllSeatByTripId(roundTrip.tripInfo.tripId, toTime),
      ]);
      setReservedSeatsTrip(reservedSeatsTrip);
      setReservedSeatsRoundTrip(reservedSeatsRoundTrip);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSelectSeat = (selectedSeatsTrip) => {
    dispatch(setSeats({ type: 'trip', seats: selectedSeatsTrip.length })); // số lượng ghế
    dispatch(setSeatCode({ type: 'trip', seatsCode: selectedSeatsTrip })); // số ghế
    dispatch(
      settotalPrice({
        type: 'trip',
        totalPrice: selectedSeatsTrip.length * trip.tripInfo.tripPrice,
      }),
    ); // số ghế * giá vé của chuyến xe
  };

  // round trip
  const handleChangeSelectSeatReturnTrip = (selectedSeatsReturnTrip) => {
    dispatch(
      setSeats({ type: 'roundTrip', seats: selectedSeatsReturnTrip.length }), // số lượng ghế
    );
    dispatch(
      setSeatCode({ type: 'roundTrip', seatsCode: selectedSeatsReturnTrip }), // số ghế
    );
    dispatch(
      settotalPrice({
        type: 'roundTrip',
        totalPrice:
          selectedSeatsReturnTrip.length * roundTrip.tripInfo.tripPrice, // số ghế * giá vé của chuyến xe
      }),
    );
  };
  return (
    <>
      {isLoading ? (
        <div className="p-4 min-h-[300px] flex justify-center items-center text-primary-blue-500 border rounded-t-lg">
          <Spin size="small" />
        </div>
      ) : isReturn ? (
        <div className={`p-4 border rounded-t-lg`}>
          <div className="flex justify-center gap-8 mb-6">
            <div className="">
              <div className="flex flex-col pb-4">
                <h3 className="text-20">Chọn ghế</h3>
                <span className="text-14">{`Chuyến đi - ${formatDateBooking(
                  fromTime,
                )}`}</span>
              </div>
              <Seats
                loading={isLoading}
                busType={trip.tripInfo.tripBusType}
                reservedSeatsTrip={reservedSeatsTrip}
                onChange={handleChangeSelectSeat}
                fromTime={fromTime}
                toTime={toTime}
              />
            </div>
            <div className="border-r"></div>
            <div className="">
              <div className="flex flex-col pb-4">
                <h3 className="text-20">Chọn ghế</h3>
                <span className="text-14">{`Chuyến về - ${formatDateBooking(
                  toTime,
                )}`}</span>
              </div>
              <Seats
                loading={isLoading}
                busType={roundTrip.tripInfo.tripBusType}
                reservedSeatsTrip={reservedSeatsRoundTrip}
                onChange={handleChangeSelectSeatReturnTrip}
                fromTime={fromTime}
                toTime={toTime}
              />
            </div>
          </div>
          <SeatStatus className={'justify-center'} />
        </div>
      ) : (
        <div className={`p-4 border rounded-t-lg`}>
          <div className="">
            <div className="pb-4">
              <h3 className="text-20">Chọn ghế</h3>
            </div>
            <div className="flex gap-8">
              <Seats
                loading={isLoading}
                busType={trip.tripInfo.tripBusType}
                reservedSeatsTrip={reservedSeatsTrip}
                onChange={handleChangeSelectSeat}
              />
              <SeatStatus className={'flex-col'} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SeatSelection);
