import { Modal } from 'antd';
import FormCURoute from '../FormCURoute';
import { useState } from 'react';
import { MessageConstantAdmin } from '@/constants/MessageConstant';
import { routeApi } from '@/services/routeApi';
import { ACTIONS } from '@/constants/commonConstant';

const FormEditRoute = ({
  title,
  route,
  open,
  setOpen,
  updateData,
  openNotification,
}) => {
  const [loading, setLoading] = useState(false);
  const handleEditRoute = async (data) => {
    setLoading(true);
    try {
      // console.log('data submit edit route: ', data);
      const res = await routeApi.updateRoute(data);
      // console.log(res);
      setOpen(false);
      updateData();
      openNotification.success(res.message);
    } catch (err) {
      // console.log('err :', err);
      openNotification.error(err.response.data.message);
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
        type={ACTIONS.UPDATE}
        route={route}
        setOpen={setOpen}
        handleRoute={handleEditRoute}
        loading={loading}
      />
    </Modal>
  );
};

export default FormEditRoute;
