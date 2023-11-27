import { Modal } from 'antd';
import { useState } from 'react';
import FormCUUser from '../FormCUUser';
import { userApi } from '@/services/userApi';
import authApi from '@/services/authApi';
import { setCurrentUser } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';

const FormEditUser = ({
  user,
  openEditUser,
  setOpenEditUser,
  fetchData,
  openNotification,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleEditUser = async (data) => {
    data.birthday = data?.birthday?.format('DD-MM-YYYY');
    setLoading(true);
    console.log('Data update: ', data);
    try {
      const res = await userApi.updateUserByAdmin(data);
      console.log(res);
      setLoading(false);
      setOpenEditUser(false);
      fetchData();
      const userUpdate = await authApi.getUser();
      dispatch(setCurrentUser(userUpdate));
      openNotification.success(res.message);
    } catch (err) {
      console.log(err);
      openNotification.error(err.response.data.messgae);
    }
  };
  const handleCancelAddUser = () => {
    setOpenEditUser(false);
  };
  console.log('Re-render Form edit user');
  return (
    <Modal
      title="Sửa thông tin người dùng"
      open={openEditUser}
      confirmLoading={loading}
      onOk={() => handleSubmit(handleEditUser)()}
      onCancel={handleCancelAddUser}
      footer={null}
      className="p-10"
    >
      <FormCUUser
        type={'update'}
        user={user}
        setOpenModal={setOpenEditUser}
        handleUser={handleEditUser}
        loading={loading}
      />
    </Modal>
  );
};

export default FormEditUser;
