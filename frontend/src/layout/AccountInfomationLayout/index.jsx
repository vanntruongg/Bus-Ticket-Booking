import { Link, useLocation } from 'react-router-dom';
import { MdHistory, MdPassword, MdLogout } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { PiWarningOctagonBold } from 'react-icons/pi';
import BgImage from '@/assets/bg9.png';
import { USER_STYLE } from '@/constants/styleContant';
import { Suspense, lazy } from 'react';
export const Header = lazy(() => import('../Header'));
export const Footer = lazy(() => import('../Footer'));
import { PathRoutesUser } from '@/constants/PathRoutes';
import { useState } from 'react';
import { Modal } from 'antd';
import useLogout from '@/hooks/useLogout';

const links = [
  {
    id: 1,
    redirect: PathRoutesUser.PERSONAL_INFORMATION,
    icon: AiOutlineUser,
    label: 'Thông tin tài khoản',
    style: 'translate-y-[0%]',
  },
  {
    id: 2,
    redirect: PathRoutesUser.HISTORY_RESERVATION,
    icon: MdHistory,
    label: 'Lịch sử mua vé',
    style: 'translate-y-[100%]',
  },
  {
    id: 3,
    redirect: PathRoutesUser.CHANGE_PASSWORD,
    icon: MdPassword,
    label: 'Đổi mật khẩu',
    style: 'translate-y-[200%]',
  },
  {
    id: 4,
    icon: MdLogout,
    label: 'Đăng xuất',
    style: 'translate-y-[300%]',
  },
];

const AccountInformationLayout = ({ children }) => {
  const location = useLocation();
  // giá tị ban đầu: tìm xem link nào đang match với location để reload lại vẫn nằm đúng chỗ
  const [classNameAbsoluteLinks, setClassNameAbsoluteLinks] = useState(() =>
    links.find((link) => link.redirect === location.pathname),
  );
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleChangeLinks = (style) => {
    setClassNameAbsoluteLinks(style);
  };
  const logout = useLogout();
  const showModalConfirmLogout = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
      logout();
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
      className="h-[400px] bg-no-repeat bg-cover "
    >
      <header className="">
        <Suspense fallback={<div className=""></div>}>
          <Header />
        </Suspense>
        {/* <div className="mx-48 border-b">
          <Nav />
        </div> */}
      </header>

      <div
        style={{ paddingTop: USER_STYLE.HEIGTH_HEADER + 'px' }}
        className="px-16 mb-10 max-w-[1360px] mx-auto grid grid-cols-8 gap-8 "
      >
        <aside className="col-span-2 bg-white py-4 border rounded-md">
          <ul className="relative">
            {links.map((link) => (
              <li key={link.id} onClick={() => handleChangeLinks(link)}>
                {link.redirect ? (
                  <Link to={link.redirect}>
                    <div
                      className={`
                    py-4 px-4 flex items-center transition-all duration-200 hover:bg-primary-100
                    ${location.pathname === link.redirect && 'text-primary-500'}
                    `}
                      onClick={() => handleChangeLinks(link.style)}
                    >
                      <link.icon className="mx-1" size={18} />
                      <span className="font-medium">{link.label}</span>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <div
                      className={`
                      py-4 px-4 flex items-center transition-all duration-200 hover:bg-primary-100 cursor-pointer
                      `}
                      onClick={showModalConfirmLogout}
                    >
                      <link.icon className="mx-1" size={18} />
                      <span className="font-medium">{link.label}</span>
                    </div>
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
                  </div>
                )}
              </li>
            ))}
            <span
              style={{ height: `${100 / links.length}%` }}
              className={`absolute top-0 left-0 
              w-1 bg-primary-500 rounded-full transition-all duration-300 ${classNameAbsoluteLinks.style}`}
            ></span>
          </ul>
        </aside>
        <main className="bg-white min-h-[80vh] shadow-mdCustom rounded-md p-4 col-span-6">
          {children}
        </main>
      </div>

      <Suspense fallback={<div className=""></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AccountInformationLayout;
