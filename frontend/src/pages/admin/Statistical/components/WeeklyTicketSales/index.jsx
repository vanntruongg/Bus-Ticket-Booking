import { useEffect, useMemo, useState } from 'react';
import LineChart from '../../../components/chart/LineChart';
import { IoTicketOutline } from 'react-icons/io5';
import statisticApi from '@/services/statisticApi';

const WeeklyTicketSales = () => {
  const [ticketTicketSoldThisWeek, setTicketSoldThisWeek] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const tickets = await statisticApi.getTicketSoldThisWeek();
        setTicketSoldThisWeek(tickets);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  console.log(ticketTicketSoldThisWeek);
  const totalSold = useMemo(() => {
    return ticketTicketSoldThisWeek.reduce((item, curr) => {
      return item + curr.value;
    }, 0);
  }, [ticketTicketSoldThisWeek]);
  return (
    <div className="bg-white p-2">
      <div className="p-2 flex justify-between">
        <div className="">
          <p className="text-14 text-gray-400">Tổng vé đã bán tuần này</p>
          <div className="flex items-center gap-2">
            <IoTicketOutline color="#00c5a7" size={20} />
            <span className="text-24">{totalSold}</span>
          </div>
        </div>
        <span className="text-14 text-gray-400">Đơn vị: VÉ</span>
      </div>
      <LineChart
        type={'daysInWeek'}
        label={'Tổng vé đã bán'}
        mainData={ticketTicketSoldThisWeek}
        width={100}
        height={50}
      />
      {/* <BarChart label={'Tổng vé đã bán'} dataChart={ticketTicketSoldThisWeek} /> */}
    </div>
  );
};

export default WeeklyTicketSales;
