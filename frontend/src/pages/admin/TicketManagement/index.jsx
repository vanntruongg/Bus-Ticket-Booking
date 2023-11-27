import { useMemo, useState } from 'react';

import TicketManagementComp from '@/components/TicketManagementComp';
import { ThreeBodyLoading } from '@/components/Loading';
import { ticketApi } from '@/services/ticketApi';
import { GetTicketType } from '@/constants/commonConstant';

const TicketManagement = () => {
  const [loading, setLoading] = useState(false);
  // const [typeGetTicket, setTypeGetTicket] = useState({
  //   type: GetTicketType.NEWLY_PURCHASE,
  //   // pageNumber: 0,
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await ticketApi.getTicketByType(typeGetTicket.type, '', 0);
  //       // console.log('res: ', res);
  //       setListTicket(res);
  //       setLoading(false);
  //     } catch (err) {
  //       throw new Error(err);
  //     }
  //   };
  //   fetchData();
  // }, [typeGetTicket]);

  const handleGetTicketByType = async (type, pageNumber) => {
    // setTypeGetTicket(type);
    try {
      const res = await ticketApi.getTicketByType(type, '', pageNumber);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  const columns = useMemo(() => [
    {
      title: 'Khách hàng',
      dataIndex: 'client',
      key: 'client',
      children: [
        {
          title: 'Tên',
          dataIndex: 'fullName',
          key: 'fullName',
          render: (_, ticket) => (
            <span>
              {ticket.user.lastName} {ticket.user.firstName}
            </span>
          ),
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          key: 'phone',
          render: (_, ticket) => <span>{ticket.user.phone}</span>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          render: (_, ticket) => <span>{ticket.user.email}</span>,
        },
      ],
    },
  ]);
  return (
    <div className="overflow-auto">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-24 font-openSans font-semibold uppercase">
          Danh sách đặt vé
        </h2>
      </div>
      <TicketManagementComp
        columns={columns}
        handleChangeType={handleGetTicketByType}
        loading={loading}
        minWidth={'min-w-[1400px]'}
      />
    </div>
  );
};

export default TicketManagement;
