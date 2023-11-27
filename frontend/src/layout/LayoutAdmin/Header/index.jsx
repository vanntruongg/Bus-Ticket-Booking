import { PathRoutesUser } from '@/constants/PathRoutes';
import { Tooltip } from 'antd';
import { BiHome } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="uppercase bg-gradient-to-r from-primary-800  to-primary-300 bg-clip-text text-24 text-transparent font-openSans font-bold">
        Trang Quản Trị
      </h1>
    </header>
  );
};

export default Header;
