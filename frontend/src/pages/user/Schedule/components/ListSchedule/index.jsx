import { v4 as uuidv4 } from 'uuid';

import ItemSchedule from '../ItemSchedule';

const ListSchedule = ({ schedule }) => {
  return (
    <div
      key={uuidv4()}
      className="bg-white opacity-95 p-2 my-4 max-h-[200px] font-medium border rounded-lg overflow-y-auto shadow-mdCustom scrollbar scrollbar-w-1.5 scroll-smooth scrollbar-thumb-rounded-lg scrollbar-thumb-primary-300 scrollbar-track-gray-300 scrollbar-track-rounded-full"
    >
      {schedule.map((item) => (
        <ItemSchedule key={item.routeId} schedule={item} />
      ))}
    </div>
  );
};

export default ListSchedule;
