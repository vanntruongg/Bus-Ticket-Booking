import CheckImg from '@/assets/check.png';
import { formatVND } from '@/utils/stringUtils';
import { useState } from 'react';

const FrameTicketInfor = ({ ticket, children }) => {
  console.log(ticket);
  return (
    <div className="mx-16">
      <div className="flex flex-col justify-center items-center mb-6">
        <img src={CheckImg} alt="check img" className="w-[8%]" />
        <h3 className="text-24 text-primary-500 font-codePro font-semibold">
          Mua vé xe thành công
        </h3>
        <span className="text-white text-14 italic">
          VT Online Bus Ticket Booking đã gửi thông tin đặt vé về địa chỉ email{' '}
          {ticket.email}. Vui lòng kiểm tra lại.
        </span>
      </div>
      <main className="mb-10 pb-10 bg-gray-100 border rounded-xl">
        <div className="bg-gray-200 py-1 text-center rounded-t-xl">
          <span className="uppercase font-openSans font-bold">
            Thông tin mua vé
          </span>
        </div>
        <div className="">
          <div className="flex p-4">
            <div className="flex-1">
              <div className="my-2 flex">
                <span className="w-32 text-gray-600 font-medium ">
                  Họ và tên:
                </span>
                <span className="font-semibold">{ticket[0].fullName}</span>
              </div>
              <div className="my-2 flex">
                <span className="w-32 text-gray-600 font-medium ">
                  Số điện thoại:
                </span>
                <span className="font-semibold">{ticket[0].phone}</span>
              </div>
              <div className="my-2 flex">
                <span className="w-32 text-gray-600 font-medium ">Email:</span>
                <span className="font-semibold">{ticket[0].email}</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="my-2 flex">
                <span className="w-32 text-gray-600 font-medium ">
                  Tổng giá vé:
                </span>
                {ticket.map((tk) => (
                  <span key={tk.ticketId} className="font-semibold">
                    {formatVND(tk.totalPrice)}
                  </span>
                ))}
              </div>
              <div className="my-2 flex">
                <span className="w-32 text-gray-600 font-medium ">PTTT:</span>
                <span className="font-semibold">{ticket[0].paymentMethod}</span>
              </div>
              <div className="my-2 flex">
                <span className="w-32 text-gray-600 font-medium ">
                  Trạng thái:
                </span>
                <span className="text-green-500">{ticket[0].status}</span>
              </div>
            </div>
          </div>

          <div className="flex">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default FrameTicketInfor;
