import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TicketManagementComp from '@/components/TicketManagementComp';
import { ticketApi } from '@/services/ticketApi';
import { GetTicketType } from '@/constants/commonConstant';

const HistoryBuyTicket = () => {
  console.log('re render HistoryBuyTicket');
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleGetTicketByType = async (type, pageNumber) => {
    setLoading(true);
    try {
      const res = await ticketApi.getTicketByType(
        type,
        currentUser.email,
        pageNumber,
      );
      setLoading(false);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  // console.log('listTicket: ', listTicket);

  return (
    <div className="rounded-md">
      <section className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-24 font-semibold">Lịch sử mua vé</h2>
          <span className="text-gray-500 text-14">
            Theo dõi và quản lý quá trình lịch sử mua vé của bạn
          </span>
        </div>
      </section>

      <section>
        <TicketManagementComp
          handleChangeType={handleGetTicketByType}
          loading={loading}
        />
      </section>
    </div>
  );
};

export default HistoryBuyTicket;
