import { PathRoutesUser } from '@/constants/PathRoutes';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="">
      <Result
        status="403"
        title="VT OBTBMS 403"
        subTitle="Xin lỗi, bạn không được phép truy cập trang này."
        extra={
          <Button type="primary">
            <Link to={PathRoutesUser.HOME}>Về Trang chủ</Link>
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
