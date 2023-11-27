import { useEffect, useMemo, useState } from 'react';
import Card from '../../../components/Card';
import Logo from '@/assets/avatar-default.png';
import statisticApi from '@/services/statisticApi';
import { set } from 'react-hook-form';

const ListCard = () => {
  const [totalTicketUsedToday, setTotalTicketUsedToday] = useState(0);
  const [thisWeekRevenue, setThisWeekRevenue] = useState([]);
  const [totalTicketBookingToday, setTotalTicketBookingToday] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const [ticketUsedToday, revenueOfWeek, ticketBookingToday, uses] =
        await Promise.all([
          statisticApi.getTotalTicketUsedToday(),
          statisticApi.getRevenueThisWeek(),
          statisticApi.getTotalTicketBookingToday,
          statisticApi.countTotalUsers(),
        ]);
      setTotalTicketUsedToday(ticketUsedToday);
      setThisWeekRevenue(revenueOfWeek);
      setTotalTicketBookingToday(ticketBookingToday);
      setTotalUsers(uses);
    } catch (err) {
      console.log(err);
    }
  };
  const totalRevenueThisWeek = useMemo(() => {
    return thisWeekRevenue?.reduce((acc, curr) => acc + curr.value, 0);
  }, [thisWeekRevenue]);
  return (
    <div className="grid grid-cols-4 gap-8">
      <Card
        label={'Số vé sử dụng hôm nay'}
        values={totalTicketUsedToday}
        description={'Vé'}
      />
      <Card
        label={'Tổng doanh thu tuần này'}
        values={totalRevenueThisWeek}
        description={'Doanh thu (VND)'}
      />
      <Card
        label={'Số vé đặt trước hôm nay'}
        values={totalTicketBookingToday}
        description={'Vé'}
      />
      <Card
        label={'Tổng số người dùng hệ thống'}
        values={totalUsers}
        description={'Người dùng'}
      />
    </div>
  );
};

export default ListCard;
