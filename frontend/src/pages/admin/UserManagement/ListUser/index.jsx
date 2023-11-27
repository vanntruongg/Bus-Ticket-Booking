import { Button, Space, Table, Tag } from 'antd';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { rolesMap, rolesMapValue } from '@/constants/defaultData';
import FilterSearchTable from '../../components/FilterSearchTable';
import ActionsRenderer from '../../components/ActionsRenderer';
import { useEffect, useState } from 'react';
import FormAddUser from '../FormAddUser';
import ToastMessage from '@/components/Toast';
import FormEditUser from '../FormEditUser';
import { userApi } from '@/services/userApi';
import { ThreeBodyLoading } from '@/components/Loading';
import { accountStatus } from '@/resources/dataDefault';

const ListUser = () => {
  const [listUser, setListUser] = useState([]);
  const { contextHolder, openNotification } = ToastMessage();
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const getColumnSearchProps = FilterSearchTable();
  const [popconfirmStates, setPopconfirmStates] = useState({});

  const fetchData = () => {
    setLoading(true);
    userApi
      .getAllUser()
      .then((res) => {
        setListUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleOpenEditUser = (user) => {
    console.log('edit user with id: ', user);
    setUserEdit(user);
    setOpenEditUser(true);
  };

  const handleDeleteUser = async (email) => {
    setLoading(true);
    try {
      console.log('delete user with id: ', email);
      const res = await userApi.deleteUser(email);
      console.log(res);
      fetchData();
      openNotification.success(res.message);
    } catch (err) {
      console.log(err);
      openNotification.error(err.response.data.message);
    } finally {
      setLoading(false);
      setPopconfirmStates({ ...popconfirmStates, [email]: false });
    }
  };

  const columns = [
    {
      title: 'Họ',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      key: 'firstName',
      ...getColumnSearchProps('firstName'),
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      render: (text) => <>{text ? text : '...'}</>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <>{text ? text : '...'}</>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <Tag
          color={
            status === accountStatus.ACTIVE
              ? 'green'
              : status === accountStatus.UNREGISTER && 'purple'
          }
          key={status}
          className="flex justify-center my-0.5"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Phân quyền',
      dataIndex: 'roles',
      key: 'roles',
      ...getColumnSearchProps('roles'),
      render: (roles) => (
        <>
          {roles.map((role) => {
            let color =
              role.id === 1 ? 'green' : role.id === 2 ? 'purple' : 'blue';
            return (
              <Tag
                color={color}
                key={role.id}
                className="flex justify-center my-0.5"
              >
                {rolesMapValue[role.roleName].toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => {
        return (
          <ActionsRenderer
            type={'Người dùng'}
            record={record}
            handleOpenEdit={handleOpenEditUser}
            handleDelete={handleDeleteUser}
            loading={loading}
            popconfirmStates={popconfirmStates[record.email]}
            setPopconfirmStates={setPopconfirmStates}
          />
        );
      },
    },
  ];
  console.log(listUser);
  return (
    <>
      {contextHolder}
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-24 font-openSans font-semibold uppercase">
          Danh sách người dùng
        </h2>
        <Button type="primary" className="-mt-0.5" onClick={handleOpenAddUser}>
          <AiOutlineUserAdd size={20} />
          {/* <span>Thêm người dùng</span> */}
        </Button>
      </div>
      {openAddUser && (
        <FormAddUser
          openAddUser={openAddUser}
          setOpenAddUser={setOpenAddUser}
          openNotification={openNotification}
        />
      )}
      {openEditUser && (
        <FormEditUser
          user={userEdit}
          openEditUser={openEditUser}
          setOpenEditUser={setOpenEditUser}
          openNotification={openNotification}
          fetchData={fetchData}
        />
      )}
      {loading ? (
        <ThreeBodyLoading />
      ) : (
        <Table
          rowKey={'email'}
          columns={columns}
          dataSource={listUser}
          className="rounded-md shadow-mdCustom"
        />
      )}
    </>
  );
};

export default ListUser;
