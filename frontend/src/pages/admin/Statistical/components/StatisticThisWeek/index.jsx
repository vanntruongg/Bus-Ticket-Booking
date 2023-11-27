import { useEffect, useMemo, useState } from 'react';
import BarChart from '../../../components/chart/BarChart';
import { IoTicketOutline } from 'react-icons/io5';
import { GiMoneyStack } from 'react-icons/gi';
import statisticApi from '@/services/statisticApi';
import CountUp from 'react-countup';

const WeeklyRevenue = () => {
  const [revenueThisWeek, setRevenueThisWeek] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const revenue = await statisticApi.getRevenueThisWeek();
      setRevenueThisWeek(revenue);
    } catch (err) {
      console.log(err);
    }
  };

  const totalRevennue = useMemo(() => {
    return revenueThisWeek.reduce((acc, curr) => acc + curr.value, 0);
  }, [revenueThisWeek]);
  // const totalTicket = useMemo(() => {
  //   return ticketTicketSoldThisWeek.reduce((acc, curr) => acc + curr.value, 0);
  // }, [ticketTicketSoldThisWeek]);
  return (
    <div className="bg-white p-2">
      <div className="p-2 flex justify-between">
        <div className="flex-1">
          <p className="text-14 text-gray-400">Doanh thu tuần này</p>
          {/* <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <IoTicketOutline color="#08675d" size={20} />
              <span className="text-24">{totalTicket}</span>
            </div> */}
          <div className="flex items-center gap-2">
            <GiMoneyStack color="#08675d" size={20} />
            <span className="text-24">
              {<CountUp end={totalRevennue} separator="," />}
            </span>
          </div>
          {/* </div> */}
        </div>
        <span className="text-14 text-gray-400">Đơn vị: Vé - VND</span>
      </div>
      <BarChart label={'Doanh thu tuần này'} dataChart={revenueThisWeek} />
    </div>
  );
};

export default WeeklyRevenue;
