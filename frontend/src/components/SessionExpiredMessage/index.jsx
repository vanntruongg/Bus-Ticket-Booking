import { PathRoutesUser } from '@/constants/PathRoutes';
import { setSessionExpired } from '@/redux/sessionExpiredSlice';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SessionExpiredMessage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { sessionExpired } = useSelector((state) => state.sessionExpired);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleRedirectLogin = () => {
    navigate(PathRoutesUser.LOGIN);
    dispatch(setSessionExpired(false));
    setIsModalOpen(false);
  };
  const handleRedirectHome = () => {
    navigate(PathRoutesUser.HOME);
    dispatch(setSessionExpired(false));
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (sessionExpired) {
      showModal();
    }
  }, [sessionExpired]);

  // const handleOpenMesss = () => {
  //   dispatch(setSessionExpired(true));
  // };
  return (
    <>
      {/* <Button onClick={handleOpenMesss}>Open</Button> */}
      <Modal
        title="Phiên đăng nhập đã hết hạn."
        open={isModalOpen}
        onOk={handleRedirectHome}
        onCancel={handleRedirectLogin}
        footer={[
          <Button key="back" onClick={handleRedirectLogin}>
            Đăng nhập
          </Button>,
          <Button key="submit" type="primary" onClick={handleRedirectHome}>
            Về Trang chủ
          </Button>,
        ]}
      >
        <p>Vui lòng đăng nhập lại hoặc trở về trang chủ.</p>
      </Modal>
    </>
  );
};

export default SessionExpiredMessage;
