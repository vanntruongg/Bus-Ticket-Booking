import { Button, Drawer } from 'antd';
import FormCUTrip from '../FormCUTrip';
import { BsFillBusFrontFill } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import ToastMessage from '@/components/Toast';
import tripApi from '@/services/tripApi';
import dayjs from 'dayjs';

const FormAddTrip = () => {
  console.log('Re-render add trip');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const { contextHolder, openNotification } = ToastMessage();

  const handleAddTrip = async (data) => {
    setLoading(true);
    try {
      const tripCreate = {
        routeId: data.routeId,
        busId: data.busId,
        departureTime: dayjs(data.departureTime).format('HH:mm:ss'),
        tripDate: dayjs(data.tripDate).format('DD-MM-YYYY'),
      };
      // console.log('tripCreate: ', tripCreate);
      const res = await tripApi.createTrip(tripCreate);
      // console.log(res);
      openNotification.success(res.message);
    } catch (err) {
      openNotification.error(err.response.data.message);
      throw new Error(err);
    } finally {
      setLoading(false);
      setOpenDrawer(false);
    }
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        onClick={handleOpenDrawer}
        className="flex items-center gap-1"
      >
        <AiOutlinePlus size={18} />
        <BsFillBusFrontFill size={18} />
      </Button>
      <Drawer
        title={'Thêm chuyến xe'}
        placement="right"
        closable={false}
        onClose={onClose}
        open={openDrawer}
        size="large"
      >
        <FormCUTrip
          type={'Thêm chuyến xe'}
          submit={handleAddTrip}
          loading={loading}
        />
      </Drawer>
    </>
  );
};

export default FormAddTrip;
