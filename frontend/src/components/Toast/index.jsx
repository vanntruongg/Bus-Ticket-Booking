import { notification } from 'antd';

const ToastMessage = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = {
    success: (message) => {
      api.success({
        message: message,
      });
    },
    info: (message) => {
      api.info({
        message: message,
      });
    },
    warn: (message) => {
      api.warn({
        message: message,
      });
    },
    error: (message) => {
      api.error({
        message: message,
      });
    },
  };

  return { contextHolder, openNotification };
};

export default ToastMessage;
