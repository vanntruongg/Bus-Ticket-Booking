// import FormCUTrip from '../FormCUTrip';

import { Drawer } from 'antd';
import FormCUTrip from '../FormCUTrip';
import tripApi from '@/services/tripApi';
import ToastMessage from '@/components/Toast';

// const FormUpdateTrip = () => {
//   return <FormCUTrip type={'Cập nhât chuyến xe'} submit={handleUpdateTrip} />;
// };

const FormUpdateTrip = ({ tripEdit, openDrawer, setOpenDrawer }) => {
  const { contextHolder, openNotification } = ToastMessage();
  const handleUpdateTrip = async (data) => {
    console.log('Data update trip: ', data);
    console.log('handle update trip');
    try {
      const res = await tripApi.updateTrip(data);
      console.log(res);
      openNotification.success(res.message);
    } catch (err) {
      openNotification.error(
        'It cannot be deleted because it is associated with other data.',
      );
      console.log(err);
    } finally {
      setOpenDrawer(false);
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };
  return (
    <Drawer
      title={'Cập nhật chuyến xe'}
      placement="right"
      closable={false}
      onClose={onClose}
      open={openDrawer}
      size="large"
    >
      {contextHolder}
      <FormCUTrip
        type={'Cập nhật chuyến xe'}
        submit={handleUpdateTrip}
        trip={tripEdit}
      />
    </Drawer>
  );
};

export default FormUpdateTrip;
