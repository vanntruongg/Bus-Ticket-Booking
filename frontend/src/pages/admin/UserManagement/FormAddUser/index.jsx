import { useState } from 'react';
import { Modal } from 'antd';

import FormCUUser from '../FormCUUser';
import { userApi } from '@/services/userApi';

const FormAddUser = ({ openAddUser, setOpenAddUser, openNotification }) => {
  const [loading, setLoading] = useState(false);
  const handleAddUser = async (data) => {
    // format lai ngay sinh tu datePicker
    data.birthday = data?.birthday?.format('DD-MM-YYYY');
    setLoading(true);
    try {
      console.log(data);
      const res = await userApi.createUser(data);
      console.log(res);
      setLoading(false);
      setOpenAddUser(false);
      openNotification.success(res.message + '. ' + 'Please check your email');
    } catch (err) {
      console.log(err);
      setLoading(false);
      openNotification.error(err.response.data.message);
    }
  };

  const handleCancelAddUser = () => {
    setOpenAddUser(false);
  };
  console.log('Re-render Form add user');

  return (
    <Modal
      title="Thêm người dùng"
      open={openAddUser}
      confirmLoading={loading}
      // onOk={() => handleSubmit(handleAddUser)()}
      onCancel={handleCancelAddUser}
      footer={null}
      className="p-4"
    >
      <FormCUUser
        setOpenModal={setOpenAddUser}
        handleUser={handleAddUser}
        loading={loading}
      />
    </Modal>
  );
};

export default FormAddUser;
