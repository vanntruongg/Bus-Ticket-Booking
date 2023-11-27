import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TiChartPieOutline } from 'react-icons/ti';
import { LiaSitemapSolid } from 'react-icons/lia';
import { BiUser, BiBus, BiLogOut, BiHome } from 'react-icons/bi';
import { IoTicketOutline } from 'react-icons/io5';
import { RiRouteLine } from 'react-icons/ri';
import { AiOutlineSchedule } from 'react-icons/ai';
import AvtDefault from '@/assets/avatar-default.png';
import { Button, Menu, Modal } from 'antd';
import { ADMIN_STYLE } from '@/constants/styleContant';
import { PathRoutesAdmin, PathRoutesUser } from '@/constants/PathRoutes';
import useLogout from '@/hooks/useLogout';
import { PiWarningOctagonBold } from 'react-icons/pi';
import AuthorizationCheck from '@/utils/AuthorizationCheck';
const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem(
    <Link to={PathRoutesAdmin.STATISTICAL}>Thống kê</Link>,
    '/admin/statistical',
    <TiChartPieOutline size={20} />,
  ),
  getItem('Quản lý', 'management', <LiaSitemapSolid size={20} />, [
    getItem(
      <Link to={PathRoutesAdmin.USERS} className="flex items-center gap-2">
        <BiUser />
        <span>Người dùng</span>
      </Link>,
    ),
    getItem(
      <Link to={PathRoutesAdmin.TICKETS} className="flex items-center gap-2">
        <IoTicketOutline />
        <span>Đặt vé</span>
      </Link>,
    ),
    getItem(
      <Link to={PathRoutesAdmin.ROUTES} className="flex items-center gap-2">
        <RiRouteLine />
        <span>Tuyến xe</span>
      </Link>,
    ),
    getItem(
      <Link to={PathRoutesAdmin.TRIPS} className="flex items-center gap-2">
        <BiBus />
        <span>Chuyến xe</span>
      </Link>,
    ),
  ]),
  getItem(
    <Link to={PathRoutesAdmin.BUS_SCHEDULE}>Lịch xe chạy</Link>,
    '/admin/bus-schedule',
    <AiOutlineSchedule size={20} />,
  ),
];

const SideBar = ({ widthSideBar }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();
  const logout = useLogout();
  const { isAdmin, isEmployee } = AuthorizationCheck();
  console.log('isADmin: ', isAdmin());
  console.log('isEmployee: ', isEmployee());
  const showModalConfirmLogout = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
      logout();
      navigate(PathRoutesUser.LOGIN);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-primary-300 to-primary-500 text-white px-4 rounded-lg overflow-y-auto overflow-x-hidden scrollbar-thin scroll-smooth scrollbar-thumb-rounded-lg scrollbar-thumb-primary-500 scrollbar-track-gray-200">
      <div className={`h-full`}>
        <Modal
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className="flex items-center text-16">
            <PiWarningOctagonBold className="mx-1 text-yellow-500" />
            <span>Bạn có chắc chắn muốn đăng xuất?</span>
          </div>
        </Modal>
        <Link to={PathRoutesUser.PERSONAL_INFORMATION}>
          <div className="py-4 h-[60px] flex justify-center items-center gap-4 border-b relative ">
            <div className="absolute left-3 w-8  border rounded-full overflow-hidden z-20">
              <img src={AvtDefault} alt="avatar admin" />
            </div>
            <h3
              className={`absolute left-13 uppercase font-medium whitespace-nowrap z-10 ${
                widthSideBar === '7%'
                  ? 'invisible opacity-0 transition-all duration-200'
                  : 'opacity-100 transition-all duration-500'
              }`}
            >
              Van Truong
            </h3>
          </div>
        </Link>
        <div className="py-8">
          <Menu
            defaultSelectedKeys={[location.pathname]}
            mode={
              widthSideBar !== ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE
                ? 'inline'
                : 'vertical'
            }
            theme="dark"
            items={items}
            className="bg-transparent uppercase font-medium"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <Link
            to={PathRoutesUser.HOME}
            className="bg-white text-primary-500 p-2 rounded-full animate-fadeInToLeft"
          >
            <BiHome size={24} />
          </Link>
        </div>
        <div
          className={`flex whitespace-nowrap justify-center text-primary-500 mb-4 cursor-pointer ${
            widthSideBar === ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE ? '' : 'p-1'
          }`}
          onClick={showModalConfirmLogout}
        >
          {widthSideBar === ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE ? (
            <div className="bg-white p-2 rounded-full animate-fadeInToLeft">
              <BiLogOut size={24} className="-translate-x-0.5" />
            </div>
          ) : (
            <button className="font-semibold bg-white px-4 py-1 rounded-full animate-fadeInToRight hover:bg-gray-100">
              Đăng xuất
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
