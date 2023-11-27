import { Drawer, Table } from 'antd';
import { useEffect, useState } from 'react';

import ActionsRenderer from '../../components/ActionsRenderer';
import FilterSearchTable from '../../components/FilterSearchTable';
import {
  convertTimeToMinutes,
  formatDateYYYTMMDD,
  formatTripDate,
} from '@/utils/dateUtils';

import FormUpdateTrip from '../FormUpdateTrip';
import dayjs from 'dayjs';
import tripApi from '@/services/tripApi';
import ToastMessage from '@/components/Toast';

const ListTrip = ({ data, tripDate }) => {
  const getColumnSearchProps = FilterSearchTable();
  const [popconfirmStates, setPopconfirmStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [tripEdit, setTripEdit] = useState(null);
  const { contextHolder, openNotification } = ToastMessage();

  useEffect(() => {}, [tripEdit]);

  const handleDeleteTrip = async (tripId, tripDate) => {
    setLoading(true);
    try {
      const res = await tripApi.deleteTrip(tripId, tripDate);
      console.log(res);
      console.log('delete user with id: ', tripId);
      openNotification.success(res.message);
    } catch (err) {
      openNotification.error(
        'It cannot be deleted because it is associated with other data.',
      );
      console.log(err);
    } finally {
      setLoading(false);
      setPopconfirmStates({ ...popconfirmStates, [tripId]: false });
    }
  };
  // console.log(data);
  const handleOpenEditTrip = (trip) => {
    setTripEdit(trip);
    setOpenDrawer(true);
  };
  // console.log('data: ', data);
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'tripId',
      key: 'tripId',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.tripId - b.tripId,
      render: (text) => <span className="whitespace-nowrap">{text}</span>,
    },
    {
      title: 'Tuyến đường',
      dataIndex: 'route',
      key: 'route',
      children: [
        {
          title: 'Điểm đầu',
          dataIndex: 'originName',
          key: 'originName',
          ...getColumnSearchProps('originName'),
          render: (text) => <span className="whitespace-nowrap">{text}</span>,
        },
        {
          title: 'Điểm cuối',
          dataIndex: 'destinationName',
          key: 'destinationName',
          ...getColumnSearchProps('destinationName'),
          render: (text) => <span className="whitespace-nowrap">{text}</span>,
        },
      ],
    },
    {
      title: 'Giờ khởi hành',
      dataIndex: 'departureTime',
      key: 'departureTime',
      sorter: (trip1, trip2) =>
        convertTimeToMinutes(trip1.departureTime) -
        convertTimeToMinutes(trip2.departureTime),
      render: (text) => <span className="whitespace-nowrap">{text}</span>,
      // width: 40,
    },
    // {
    //   title: 'Ngày',
    //   dataIndex: 'tripDate',
    //   key: 'tripDate',
    // },
    {
      title: 'Tài xế',
      dataIndex: 'driverName',
      key: 'driverName',
    },
    {
      title: 'Xe',
      dataIndex: 'bus',
      key: 'bus',
      children: [
        {
          title: 'Biển số',
          dataIndex: 'licensePlate',
          key: 'licensePlate',
          ...getColumnSearchProps('bus'),
          render: (text, record) => (
            <span className="whitespace-nowrap">{record.bus.licensePlate}</span>
          ),
        },
        {
          title: 'Loại xe',
          dataIndex: 'busType',
          key: 'busType',
          render: (text, record) => (
            <span className="whitespace-nowrap">
              {record.bus.busType.busTypeName}
            </span>
          ),
        },
        {
          title: 'Số chỗ',
          dataIndex: 'seatCount',
          key: 'seatCount',
          render: (text, record) => (
            <span className="whitespace-nowrap">
              {record.bus.busType.seatCount}
            </span>
          ),
        },
      ],
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <ActionsRenderer
          type={'Chuyến xe'}
          record={record}
          handleOpenEdit={handleOpenEditTrip}
          handleDelete={handleDeleteTrip}
          loading={loading}
          popconfirmStates={popconfirmStates[record.tripId]}
          setPopconfirmStates={setPopconfirmStates}
        />
      ),
    },
  ];
  const currentDate = dayjs().format('DD/MM/YYYY'); // Lấy thời gian hiện tại
  const conditionShowActions =
    formatDateYYYTMMDD(tripDate) > formatDateYYYTMMDD(currentDate);
  const finalColumns = conditionShowActions
    ? [...columns] // Nếu điều kiện đúng, giữ nguyên danh sách cột
    : columns.filter((column) => column.key !== 'actions');
  return (
    <>
      {contextHolder}
      <FormUpdateTrip
        tripEdit={tripEdit}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <Table
        rowKey={'tripId'}
        columns={finalColumns}
        dataSource={data}
        className="rounded-md shadow-mdCustom overflow-auto"
      />
    </>
  );
};

export default ListTrip;
