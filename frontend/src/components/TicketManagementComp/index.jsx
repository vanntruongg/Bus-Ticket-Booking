import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Modal, Pagination, Spin, Table, Tabs } from 'antd';
import { PiWarningOctagonBold } from 'react-icons/pi';
import { HiArrowNarrowRight } from 'react-icons/hi';

import { GetTicketType, TicketStatus } from '@/constants/commonConstant';
import { formatVND } from '@/utils/stringUtils';
import { ticketApi } from '@/services/ticketApi';
import ToastMessage from '../Toast';
import FilterSearchTable from '@/pages/admin/components/FilterSearchTable';

const TicketManagementComp = ({ columns = [], handleChangeType, minWidth }) => {
  console.log('Re-render TicketManagementComp');
  const [showAction, setShowACtion] = useState(true);
  const { contextHolder, openNotification } = ToastMessage();
  const getColumnSearchProps = FilterSearchTable();
  const [data, setData] = useState([]);
  const [type, setType] = useState(GetTicketType.NEWLY_PURCHASE);
  const [pageNumber, setPageNumber] = useState(0);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getListTicket = async () => {
    setConfirmLoading(true);
    const listTicket = await handleChangeType(type, pageNumber);
    console.log(listTicket);
    setData(listTicket?.content);
    setPagination({
      current: listTicket?.pageable?.pageNumber + 1,
      pageSize: listTicket?.pageable?.pageNumber,
      total: listTicket?.totalElements,
    });
    setConfirmLoading(false);
  };

  useEffect(() => {
    getListTicket();
  }, [type, pageNumber]);

  const onChangeType = async (key) => {
    if (key == GetTicketType.NEWLY_PURCHASE) {
      setShowACtion(true);
    } else {
      setShowACtion(false);
    }
    setType(key);
    setPageNumber(0);
  };
  const handleChangePagination = (pageNumber) => {
    setPageNumber(pageNumber - 1);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      console.log('Hủy vé : ', selectedTicket);
      const res = await ticketApi.cancelTicket(selectedTicket);
      console.log('res: ', res);
      getListTicket();
      openNotification.success(res.message);
    } catch (err) {
      openNotification.error(err.response.data.message);
      throw new Error(err);
    } finally {
      setOpen(false);
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const defaultColums = useMemo(() => [
    {
      title: 'Mã vé',
      dataIndex: 'ticketId',
      key: 'ticketId',
      ...getColumnSearchProps('ticketId'),
    },
    {
      title: 'Tuyến đường',
      dataIndex: 'route',
      key: 'route',
      render: (_, ticket) => (
        <span className="flex items-center gap-0.5">
          {ticket.trip.route.originId.locationName}
          {<HiArrowNarrowRight />}
          {ticket.trip.route.destinationId.locationName}
        </span>
      ),
    },
    {
      title: 'Ngày đi',
      dataIndex: 'tripDate',
      key: 'tripDate',
      ...getColumnSearchProps('tripDate'),
      render: (_, ticket) => (
        <span>
          {ticket.trip.departureTime} {ticket.tripDate}
        </span>
      ),
    },
    ...columns,
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_, tiket) => <span>{formatVND(tiket.totalPrice)}</span>,
    },
    {
      title: 'PTTT',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (_, ticket) => <span>{ticket.paymentMethod}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
      render: (_, ticket) => (
        <span
          className={`${
            ticket.status == 'SUCCESS' ? 'text-green-500' : 'text-red-400'
          }`}
        >
          {TicketStatus[ticket.status]}
        </span>
      ),
    },
  ]);

  const columnsAction = showAction
    ? [
        ...defaultColums,
        {
          title: 'Thao tác',
          key: 'actions',
          render: (_, record) => {
            return (
              <Button
                onClick={() => {
                  setSelectedTicket(record.ticketId);
                  setOpen(true);
                }}
              >
                Hủy vé
              </Button>
            );
          },
        },
      ]
    : defaultColums;
  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="flex items-center text-16">
          <PiWarningOctagonBold className="mx-1 text-yellow-500" />
          <p>
            Bạn có chắc chắn muốn hủy vé{' '}
            <span className="font-bold text-18 text-primary-700">
              {selectedTicket}
            </span>
          </p>
        </div>
      </Modal>
      <Tabs
        onChange={onChangeType}
        className="font-semibold font-openSans"
        items={[
          {
            label: `Vé mới đặt`,
            key: GetTicketType.NEWLY_PURCHASE,
          },
          {
            label: `Vé đã mua thành công`,
            key: GetTicketType.PURCHASE_SUCESSFULLY,
          },
          {
            label: `Vé đã hủy`,
            key: GetTicketType.CANCELLED,
          },
        ]}
      />
      <div className="rounded-md overflow-auto scrollbar scrollbar-h-1.5 scroll-smooth scrollbar-thumb-rounded-lg  scrollbar-thumb-primary-500 scrollbar-track-gray-300 ">
        {confirmLoading ? (
          <div className="min-h-[400px] flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <div className={`${minWidth}`}>
            <Table
              rowKey={'ticketId'}
              columns={columnsAction}
              dataSource={data}
              pagination={false}
            />
            <div className="flex justify-center py-4">
              <Pagination
                showSizeChanger={false}
                onChange={handleChangePagination}
                current={pagination.current}
                defaultCurrent={1}
                total={pagination.total}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(TicketManagementComp);
