import { ThreeBodyLoading } from '@/components/Loading';
import tripApi from '@/services/tripApi';
import { countWeeks, getWeeksInMonth } from '@/utils/calendarUtil';
import { convertDateToLong, getCurrentMonthAndYear } from '@/utils/dateUtils';
import { Segmented } from 'antd';
import { useEffect, useState } from 'react';

const BusSchedule1 = () => {
  const [week, setWeek] = useState(1);
  const { month, year } = getCurrentMonthAndYear();
  const weeksInMonth = getWeeksInMonth(month, year);
  const options = countWeeks(weeksInMonth);
  const [listTrip, setListTrip] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log('re-render Bus Schedule');

  useEffect(() => {
    getListTrip(week);
  }, [week]);

  const getListTrip = async (week) => {
    setLoading(true);
    try {
      const data = await tripApi.getScheduleInWeek(week);

      const sortedListTrip = Object.entries(data).sort((day1, day2) => {
        const date1 = new Date(day1[0].split('-').reverse().join('-'));
        const date2 = new Date(day2[0].split('-').reverse().join('-'));
        return date1 - date2;
      });
      setListTrip(sortedListTrip);
      setLoading(false);
    } catch (err) {
      setLoading(true);
      console.log(err);
    }
  };
  // console.log('listTrip: ', listTrip);
  const handleChangeWeek = (e) => {
    setWeek(e);
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="text-24 font-bold font-openSans uppercase">{`Lịch Xe Chạy Tháng ${month} - ${year}`}</h3>
        <Segmented
          options={options}
          onChange={handleChangeWeek}
          className="bg-gray-200"
        />
      </div>
      {loading ? (
        <ThreeBodyLoading />
      ) : (
        <div className="border">
          <div className="flex w-full border-slate-500 overflow-x-auto scrollbar scrollbar-h-1.5 scroll-smooth scrollbar-thumb-rounded-lg scrollbar-thumb-primary-500 scrollbar-track-gray-300">
            <div className="flex flex-col">
              {/* days */}
              <div className="flex">
                {listTrip.map(([day, trips], index) => (
                  // Day
                  <div key={day} className="w-full">
                    <div
                      className={`flex flex-col items-center border-t border-slate-500 border-l ${
                        index === listTrip.length - 1 && 'border-r'
                      }`}
                    >
                      <span className=" text-center font-openSans font-semibold ">
                        {convertDateToLong(day)}
                      </span>
                      <span className="text-14">{`(${day})`}</span>
                    </div>
                    {/* Schedule */}
                    <div
                      className={`flex items-center border-b border-l border-slate-500 ${
                        index === listTrip.length - 1 && 'border-r'
                      }
                    `}
                    >
                      <div className="w-full">
                        <ul className="w-full">
                          {trips?.map((trip, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 text-center border-t border-slate-500"
                            >
                              <p className="whitespace-nowrap">
                                {`${trip.departureTime} - ${trip.originName}-${trip.destinationName}`}
                              </p>
                              <span className="text-14">
                                Tài xế {`${trip.lastName} ${trip.firstName}`}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusSchedule1;
