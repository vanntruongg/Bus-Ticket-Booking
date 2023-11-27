import { Statistic } from 'antd';
import CountUp from 'react-countup';

const Card = ({ label, values, description }) => {
  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <div className="px-4 bg-white border rounded-md shadow-sm">
      <div className="flex justify-between items-center border-b border-primary-200 pt-4 pb-8">
        <div className="flex flex-col items-end">
          <span className="text-28 -mt-2">
            <Statistic
              title={label}
              value={values}
              // precision={2}
              formatter={formatter}
            />
          </span>
        </div>
      </div>
      <div className="py-1">
        <span className="text-14 text-gray-700">{description}</span>
      </div>
    </div>
  );
};

export default Card;
