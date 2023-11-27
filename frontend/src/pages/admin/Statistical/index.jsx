import ListCard from './components/ListCard';
import MainStatictis from './components/MainStatistics';
import PopularRoute from './components/PopularRoute';
import StatisticThisWeek from './components/StatisticThisWeek';
import WeeklyTicketSales from './components/WeeklyTicketSales';
const Statistical = () => {
  return (
    <div className="font-openSans font-medium flex flex-col gap-10">
      <MainStatictis />
      <ListCard />

      <div className="grid grid-cols-2 gap-8">
        <WeeklyTicketSales />
        <StatisticThisWeek />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <PopularRoute />
      </div>
    </div>
  );
};

export default Statistical;
