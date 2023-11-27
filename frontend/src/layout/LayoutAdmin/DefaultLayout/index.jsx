import { useState } from 'react';
import { TfiMenuAlt, TfiMenu } from 'react-icons/tfi';

import Header from '../Header';
import SideBar from '../SideBar';
import { ADMIN_STYLE } from '@/constants/styleContant';
import { FloatButton } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PathRoutesUser } from '@/constants/PathRoutes';

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const [widthSideBar, setWidthSideBar] = useState(
    ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE,
  );

  const handleZoomOutMenu = () => {
    setWidthSideBar(ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE);
  };
  const handleZoomInMenu = () => {
    setWidthSideBar(ADMIN_STYLE.WIDTH_SIDEBAR_OPEN);
  };

  return (
    <div className="bg-gray-100 px-4 pb-10 min-h-screen">
      <div className=" top-0 w-full h-[60px] px-[36px] flex items-center bg-gray-100 z-20">
        <button className="">
          {widthSideBar === ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE ? (
            <TfiMenuAlt size={20} className="" onClick={handleZoomInMenu} />
          ) : (
            <TfiMenu size={20} className="" onClick={handleZoomOutMenu} />
          )}
        </button>
        <div className="flex-1 pl-4">
          <Header />
        </div>
      </div>
      <main className="">
        <div
          style={{ width: widthSideBar }}
          className={`fixed top-0 bottom-[80px] transition-all duration-300 z-10 `}
        >
          <button className="absolute h-[60px] w-full left-9">
            {widthSideBar === ADMIN_STYLE.WIDTH_SIDEBAR_CLOSE ? (
              <TfiMenuAlt size={20} className="" onClick={handleZoomInMenu} />
            ) : (
              <TfiMenu size={20} className="" onClick={handleZoomOutMenu} />
            )}
          </button>
          <section className={`mt-[60px] h-full`}>
            <span className="absolute top-[56px] left-9 w-4 h-4 bg-primary-300 rotate-45 -z-10"></span>
            <SideBar widthSideBar={widthSideBar} />
          </section>
        </div>
        <section
          style={{ marginLeft: `calc(${widthSideBar} + 2%)` }}
          className={`col-span-8 transition-all duration-500`}
        >
          {children}
        </section>
      </main>
    </div>
  );
};

export default DefaultLayout;
