import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '@/assets/logo-white.png';
import { PathRoutesAdmin, PathRoutesUser } from '@/constants/PathRoutes';
import { clearFromAndTo } from '@/redux/roundTripTicketSlice';
import { Button, Dropdown, Space } from 'antd';
import useLogout from '@/hooks/useLogout';
import Nav from '../Nav';
import { USER_STYLE } from '@/constants/styleContant';
import { useEffect, useRef, useState } from 'react';
import AuthorizationCheck from '@/utils/AuthorizationCheck';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, isEmployee } = AuthorizationCheck();
  const { currentUser } = useSelector((state) => state.auth);
  const logout = useLogout();
  const headerRef = useRef(null);
  const [bgHeader, setBgHeader] = useState(USER_STYLE.BG_TRANSPARENT);

  const handleLogout = () => {
    logout();
  };

  const items = [
    {
      key: '1',
      label: (
        <Link to={PathRoutesUser.PERSONAL_INFORMATION}>
          Thông tin tài khoản
        </Link>
      ),
    },
    {
      key: '2',
      label: <button onClick={handleLogout}>Đăng xuất</button>,
    },
  ];

  const redirectHome = () => {
    dispatch(clearFromAndTo());
    navigate(PathRoutesUser.HOME);
  };

  useEffect(() => {
    const handleSetBgHeader = () => {
      if (window.scrollY > 0) {
        setBgHeader(USER_STYLE.BG_HEADER);
      } else {
        setBgHeader(USER_STYLE.BG_TRANSPARENT);
      }
    };
    window.addEventListener('scroll', handleSetBgHeader);

    return () => window.removeEventListener('scroll', handleSetBgHeader);
  }, []);

  return (
    <div
      ref={headerRef}
      style={{ height: USER_STYLE.HEIGTH_HEADER + 'px' }}
      className={`flex justify-between items-center w-full px-16 text-14 rounded-b-xl transition-all duration-300 fixed z-50 ${bgHeader}`}
    >
      <div className="w-40 cursor-pointer" onClick={redirectHome}>
        <img src={Logo} alt="" />
      </div>
      <div className="flex items-center">
        <Nav />
        {/* Login & register */}
        <div className="ml-4">
          {isLoggedIn() ? (
            isAdmin() || isEmployee() ? (
              <Link to={PathRoutesAdmin.STATISTICAL} className="">
                <Button className="bg-white w-full px-4 py-1 text-primary-500 font-medium rounded-full border-primary-400 hover:bg-gray-300 transition-all duration-300">
                  Trang quản trị
                </Button>
              </Link>
            ) : (
              <div className="bg-gradient-to-tr from-primary-500 to-primary-500 p-0.5 rounded-full">
                <Dropdown
                  menu={{ items }}
                  placement="bottom"
                  arrow
                  className="bg-white rounded-full"
                >
                  <Button className="flex justify-center items-center pl-2 pr-4 py-1 border hover:border-primary-purple-500">
                    <FaRegUser className="mx-1" />
                    {`${currentUser.lastName} ${currentUser.firstName}`}
                  </Button>
                </Dropdown>
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link to={PathRoutesUser.REGISTER} className="">
                <button className="w-full px-4 py-1 text-white font-medium border border-primary-400 rounded-full hover:bg-primary-600 transition-all duration-300">
                  Đăng ký
                </button>
              </Link>
              <Link to={PathRoutesUser.LOGIN} className="">
                <button className="px-4 py-1 bg-primary-600 text-white font-medium border rounded-full transition-all duration-300 hover:bg-primary-600">
                  Đăng nhập
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
