import { formatVND } from '@/utils/stringUtils';

const Ticket = ({ ticket }) => {
  console.log('tiket: ', ticket);
  return (
    <div className="w-[30%] mx-auto p-2 px-4 border border-gray-400 rounded-lg">
      <div className="">
        <div className="my-4 flex justify-between">
          <span className="text-gray-700 font-medium">Mã đặt vé</span>
          <span className="text-primary-blue-500 font-openSans font-medium">
            {ticket.ticketId}
          </span>
        </div>
        <div className="my-4 flex justify-between">
          <span className="text-gray-700 font-medium">Tuyến xe</span>
          <span className="text-primary-blue-500 font-openSans font-medium">
            {ticket.route}
          </span>
        </div>
        <div className="my-4 flex justify-between">
          <span className="text-gray-700 font-medium">Thời gian</span>
          <span className="text-primary-blue-500 font-openSans font-medium">
            {`${ticket.departureTime} - ${ticket.tripDate}`}
          </span>
        </div>
        <div className="my-4 flex justify-between">
          <span className="text-gray-700 font-medium">Số ghế</span>
          <div className="">
            {ticket.seatCode.map((seat, index) => {
              if (index < ticket.seatCode.length - 1) {
                seat += ', ';
              }
              return (
                <span
                  key={seat}
                  className="text-primary-blue-500 font-openSans font-medium"
                >
                  {seat}
                </span>
              );
            })}
          </div>
        </div>
        <div className="my-4 flex">
          <span className="min-w-[100px] text-gray-700 font-medium">
            Điểm lên xe
          </span>
          <div className="flex flex-col">
            <span className="text-primary-blue-500 font-openSans font-medium">
              {ticket.routePoint.pointName}
            </span>
            <span className="text-gray-900 text-12 font-medium">
              {ticket.routePoint.addressDetail}
            </span>
          </div>
        </div>
        <div className="my-4 flex justify-between">
          <span className="text-gray-700 font-medium">Giá vé</span>
          <span className="text-primary-blue-500 font-openSans font-medium">
            {formatVND(ticket.fare)}
          </span>
        </div>
        <div className="my-4 flex justify-between">
          <span className="text-gray-700 font-medium">Biển số xe</span>
          <span className="text-primary-blue-500 font-openSans font-medium">
            {ticket.licensePlate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
