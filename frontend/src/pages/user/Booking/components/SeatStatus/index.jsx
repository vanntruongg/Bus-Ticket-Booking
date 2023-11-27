import { memo } from 'react';

const SeatStatus = ({ className }) => {
  return (
    <div className={`flex gap-4 ml-4 mt-5 text-12 ${className}`}>
      <span className="flex items-center">
        <div className="bg-[#C0C6CC] mr-2 w-4 h-4 rounded-md"></div>
        Đã bán
      </span>
      <span className="flex items-center">
        <div className="bg-[#339AF4] mr-2 w-4 h-4 rounded-md"></div>
        Còn trống
      </span>
      <span className="flex items-center">
        <div className="bg-primary-200 mr-2 w-4 h-4 rounded-md"></div>
        Đang chọn
      </span>
    </div>
  );
};

export default memo(SeatStatus);
