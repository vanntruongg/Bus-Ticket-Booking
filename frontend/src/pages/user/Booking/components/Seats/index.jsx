import SeatDisabled from '@/assets/seat_disabled.svg';
import SeatActive from '@/assets/seat_active.svg';
import SeatSelecting from '@/assets/seat_selecting.svg';
import { memo, useEffect, useState } from 'react';
import ToastMessage from '../../../../../components/Toast';
import { v4 as uuidv4 } from 'uuid';

import {
  Seat,
  downStairsBunk,
  downStairsLimousine,
  upFloorBunk,
  upFloorLimousine,
} from './TypeSeat';
const seatMapping = {
  Limousine: {
    upFloor: upFloorLimousine,
    downStairs: downStairsLimousine,
  },
  Giường: {
    upFloor: upFloorBunk,
    downStairs: downStairsBunk,
  },
  Ghế: {
    upFloor: Seat,
  },
};
const Seats = ({ loading, busType, reservedSeatsTrip, onChange }) => {
  console.log('Re-render Seats');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { contextHolder, openNotification } = ToastMessage();
  // kiểu ghế theo loại xe
  const upFloorSeats = seatMapping[busType].upFloor;
  const downStairsSeats = seatMapping[busType].downStairs;
  const [upFloorReservedSeats, setUpFloorReservedSeats] =
    useState(upFloorSeats);
  const [downStairsSeatsReservedSeats, setdownStairsReservedSeats] =
    useState(downStairsSeats);

  useEffect(() => {
    onChange(selectedSeats);
  }, [selectedSeats]);

  console.log('reservedSeatsTrip: ', reservedSeatsTrip);

  useEffect(() => {
    const updateUpFloor = upFloorSeats.map((row) =>
      row.map((seat) => {
        const reservedSeat = reservedSeatsTrip.find(
          (reserved) => reserved.seatCode === seat?.seat_code,
        );
        if (reservedSeat) {
          return { ...seat, seat_status: false };
        }
        return seat;
      }),
    );
    const updateDownStair = downStairsSeats.map((row) =>
      row.map((seat) => {
        const reservedSeat = reservedSeatsTrip.find(
          (reserved) => reserved.seatCode === seat?.seat_code,
        );
        if (reservedSeat) {
          return { ...seat, seat_status: false };
        }
        return seat;
      }),
    );
    setUpFloorReservedSeats(updateUpFloor);
    setdownStairsReservedSeats(updateDownStair);
  }, [upFloorSeats, downStairsSeats]);

  const toggleSeatSelection = (value) => {
    if (selectedSeats.includes(value)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat != value));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, value]);
      } else {
        openNotification.error('Đã chọn đủ số ghế');
      }
    }
  };
  // console.log('downStairsSeatsReservedSeats: ', downStairsSeatsReservedSeats);
  return (
    <div className="flex gap-8 select-none">
      {contextHolder}
      <div className="text-center font-medium text-14">
        <span className="">Tầng dưới</span>
        <table>
          <tbody>
            {downStairsSeatsReservedSeats.map((rowFloor, index) => {
              return (
                <tr
                  key={index}
                  className="flex justify-between items-center gap-1"
                >
                  {rowFloor.map((seat) =>
                    seat ? (
                      <td
                        key={seat.id}
                        className={`relative justify-center text-center mt-1 ${
                          seat.seat_status
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed'
                        }`}
                        onClick={() =>
                          seat.seat_status &&
                          toggleSeatSelection(seat.seat_code)
                        }
                      >
                        {selectedSeats.includes(seat.seat_code) ? (
                          <img src={SeatSelecting} alt="" width={32} />
                        ) : seat.seat_status ? (
                          <img src={SeatActive} alt="" width={32} />
                        ) : (
                          <img src={SeatDisabled} alt="" width={32} />
                        )}
                        <span
                          className={`
                      absolute flex-center text-10 font-bold z-10 
                      ${
                        selectedSeats.includes(seat.seat_code)
                          ? 'text-primary-500'
                          : seat.seat_status
                          ? 'text-[#339AF4]'
                          : 'text-gray-500'
                      }
                      `}
                        >
                          {upFloorSeats === Seat ? seat.id : seat.seat_code}
                        </span>
                      </td>
                    ) : (
                      <td
                        key={uuidv4()}
                        className="relative w-8 gap-1 pointer-events-none"
                      ></td>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="text-center font-medium text-14">
        {upFloorReservedSeats && <span className="">Tầng trên</span>}
        <table>
          <tbody>
            {upFloorReservedSeats?.map((rowFloor, index) => (
              <tr
                key={index}
                className="flex justify-between items-center gap-1"
              >
                {rowFloor.map((seat) =>
                  seat ? (
                    <td
                      key={seat.id}
                      className={`relative justify-center text-center mt-1 ${
                        seat.seat_status
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed'
                      }`}
                      onClick={() =>
                        seat.seat_status && toggleSeatSelection(seat.seat_code)
                      }
                    >
                      {selectedSeats.includes(seat.seat_code) ? (
                        <img src={SeatSelecting} alt="" width={32} />
                      ) : seat.seat_status ? (
                        <img src={SeatActive} alt="" width={32} />
                      ) : (
                        <img src={SeatDisabled} alt="" width={32} />
                      )}
                      <span
                        className={`
                    absolute flex-center text-10 font-bold z-10 
                    ${
                      selectedSeats.includes(seat.seat_code)
                        ? 'text-primary-500'
                        : seat.seat_status
                        ? 'text-[#339AF4]'
                        : 'text-gray-500'
                    }
                    `}
                      >
                        {seat.seat_code}
                      </span>
                    </td>
                  ) : (
                    <td
                      key={uuidv4()}
                      className="relative w-8 gap-1 pointer-events-none"
                    ></td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default memo(Seats);
