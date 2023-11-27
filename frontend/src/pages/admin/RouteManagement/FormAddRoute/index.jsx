import { Modal } from 'antd';
import FormCURoute from '../FormCURoute';
import { useState } from 'react';
import { routeApi } from '@/services/routeApi';
import { MessageConstantAdmin } from '@/constants/MessageConstant';

const FormAddRoute = ({
  title,
  open,
  setOpen,
  updateData,
  openNotification,
}) => {
  const [loading, setLoading] = useState(false);
  const handleAddRoute = async (data) => {
    setLoading(true);
    try {
      // console.log('data submit add route: ', data);
      const res = await routeApi.createRoute(data);
      // console.log(res);
      setOpen(false);
      openNotification.success(res.message);
      updateData();
    } catch (err) {
      openNotification.error(err?.response?.data.message);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title={title}
      loading={loading}
      open={open}
      onCancel={handleCancel}
      footer={null}
    >
      <FormCURoute
        setOpen={setOpen}
        handleRoute={handleAddRoute}
        loading={loading}
      />
    </Modal>
  );
};

export default FormAddRoute;
