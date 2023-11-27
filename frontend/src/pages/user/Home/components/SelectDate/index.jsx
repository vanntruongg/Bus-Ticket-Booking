import { disabledDate } from '@/utils/dateUtils';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

const DropDownSelectDate = ({ placeholder, disAbleFrom, onChangeSelect }) => {
  const onChange = (date, dateString) => {
    onChangeSelect(dateString);
  };
  // const defaultDate = new Date();
  return (
    <div className="relative cursor-pointer ">
      <Space className="outline-none w-full cursor-pointer">
        <DatePicker
          placeholder={placeholder}
          format={'DD-MM-YYYY'}
          onChange={onChange}
          disabledDate={(current) => disabledDate(current, disAbleFrom)}
          className="w-[100%] opacity-0 relative cursor-pointer"
        />
      </Space>
    </div>
  );
};

export default DropDownSelectDate;
