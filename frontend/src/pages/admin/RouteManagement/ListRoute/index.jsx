import { Button, Space, Table, Tag } from 'antd';
import { FaRoute, FaPlus } from 'react-icons/fa';
import FilterSearchTable from '../../components/FilterSearchTable';
import ActionsRenderer from '../../components/ActionsRenderer';
import { useEffect, useState } from 'react';
import ToastMessage from '@/components/Toast';
import FormAddRoute from '../FormAddRoute';
import FormEditRoute from '../FormEditRoute';
import { routeApi } from '@/services/routeApi';
import { ThreeBodyLoading } from '@/components/Loading';
import { formatVND } from '@/utils/stringUtils';

const ListRoute = () => {
  const [listRoute, setListRoute] = useState([]);
  const { contextHolder, openNotification } = ToastMessage();
  const [loading, setLoading] = useState(false);
  const getColumnSearchProps = FilterSearchTable();
  const [openAddRoute, setOpenAddRoute] = useState(false);
  const [openEditRoute, setOpenEditRoute] = useState(false);
  const [routeEdit, setRouteEdit] = useState(null);
  const [popconfirmStates, setPopconfirmStates] = useState({});

  const getData = async () => {
    setLoading(true);
    try {
      const data = await routeApi.getAllRoute();
      const combinedRoutes = data.reduce((acc, route) => acc.concat(route));
      setListRoute(combinedRoutes);
      setLoading(false);
    } catch (err) {
      setLoading(true);
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(listRoute);

  const handleOpenAddRoute = () => {
    setOpenAddRoute(true);
  };

  const handleOpenEditRoute = (route) => {
    console.log('edit Route with id: ', route);
    setRouteEdit(route);
    setOpenEditRoute(true);
  };

  const handleDeleteRoute = async (routeId) => {
    setLoading(true);
    try {
      console.log('delete Route with id: ', routeId);
      const res = await routeApi.deleteRoute(routeId);
      // console.log('Res delete route: ', res);
      openNotification.success(res.message);
      getData();
    } catch (err) {
      openNotification.error(err.response.data.message);
      console.log(err);
    } finally {
      setPopconfirmStates({ ...popconfirmStates, [routeId]: false });
      setLoading(false);
    }
  };
  const columns = [
    {
      title: 'Mã',
      dataIndex: 'routeId',
      key: 'routeId',
    },
    {
      title: 'Điểm đầu',
      dataIndex: 'originId',
      key: 'originId',
      ...getColumnSearchProps('originId'),
      render: (text, record) => {
        return record.originId.locationName;
      },
    },
    {
      title: 'Điểm cuối',
      dataIndex: 'destinationId',
      key: 'destinationId',
      ...getColumnSearchProps('destinationId'),
      render: (text, record) => {
        return record.destinationId.locationName;
      },
    },

    {
      title: 'Thời gian hành trình',
      dataIndex: 'journeyDuration',
      key: 'journeyDuration',
    },
    {
      title: 'Độ dài tuyến đường',
      dataIndex: 'routeLength',
      key: 'routeLength',
    },
    {
      title: 'Giá (VND)',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <>{text ? `${formatVND(text)}` : '...'}</>,
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <ActionsRenderer
          type={'Tuyến đường'}
          record={record}
          handleOpenEdit={handleOpenEditRoute}
          handleDelete={handleDeleteRoute}
          loading={loading}
          popconfirmStates={
            popconfirmStates[record?.email || record?.tripId || record?.routeId]
          }
          setPopconfirmStates={setPopconfirmStates}
        />
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-24 font-openSans font-semibold uppercase">
          Danh sách tuyến đường
        </h2>
        <Button
          type="primary"
          className="-mt-0.5 flex items-center gap-1"
          onClick={handleOpenAddRoute}
        >
          <FaPlus />
          <FaRoute size={20} />
          {/* <span>Thêm người dùng</span> */}
        </Button>
      </div>
      {openAddRoute && (
        <FormAddRoute
          title={'Thêm tuyến đường'}
          open={openAddRoute}
          setOpen={setOpenAddRoute}
          openNotification={openNotification}
          updateData={getData}
        />
      )}
      {openEditRoute && (
        <FormEditRoute
          title={'Cập nhật tuyến đường'}
          route={routeEdit}
          open={openEditRoute}
          setOpen={setOpenEditRoute}
          openNotification={openNotification}
          updateData={getData}
        />
      )}
      <Table
        rowKey={'routeId'}
        columns={columns}
        dataSource={listRoute}
        className="rounded-md shadow-mdCustom"
      />
    </>
  );
};

export default ListRoute;
