import { PathRoutesUser } from '@/constants/PathRoutes';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="">
      <Result
        status={'404'}
        title={'VT OBTBMS 404'}
        subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
        extra={
          <Button type="primary">
            <Link to={PathRoutesUser.HOME}>Về trang chủ</Link>
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
