import { PathRoutesUser } from '@/constants/PathRoutes';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo-transparent.png';
import { defaultInformation } from '@/constants/defaultData';
const Footer = () => {
  return (
    <footer className="">
      <div className="px-16 bg-primary-50 p-4 grid grid-cols-4 gap-8">
        <section className="">
          <div className="mb-4">
            <h3 className="uppercase font-openSans font-semibold">
              Trung tâm tổng đài & CSKH
            </h3>
            <div className="-mt-2 text-28 text-primary-600">
              <span>8080 3030</span>
            </div>
          </div>
          <div className="text-14">
            {defaultInformation.map((infor) => (
              <div key={infor.key} className="flex justify-between">
                <span className="text-gray-500">{infor.label}</span>
                <span className="">
                  <a href={infor.link} target={infor?.target}>
                    {infor.children}
                  </a>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="">
          <h3 className="mb-2 font-openSans font-medium">
            VT Online Bus Tickets Reservation
          </h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center">
              <div className="w-2 h-2 mr-2 mt-1 bg-slate-300 rounded-full"></div>
              <Link
                to={PathRoutesUser.SCHEDULE}
                className="text-gray-900 transition-all duration-200 hover:text-primary-500"
              >
                Lịch trình
              </Link>
            </li>
          </ul>
        </section>
        <section className="">
          <h3 className="mb-2 font-openSans font-medium">Hỗ trợ</h3>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center">
              <div className="w-2 h-2 mr-2 mt-1 bg-slate-300 rounded-full"></div>
              <Link
                to={PathRoutesUser.SEARCH_TICKET}
                className="text-gray-900 transition-all duration-200 hover:text-primary-500"
              >
                Tra cứu thông tin đặt vé
              </Link>
            </li>
          </ul>
        </section>
        <section>
          <img src={Logo} alt="" />
        </section>
      </div>
      {/** Copy Right */}
      <div className="px-16 bg-primary-800 flex justify-center py-2 text-white">
        <span className="">© 2023</span>
        <span className="border-r-2 mx-2"></span>
        <div className="flex">
          <span>Bản quyền thuộc về Online Bus Tickets Reservation</span>
          <span className="font-bold mx-2">-</span>
          <a
            href="https://portfolio-vtd.vercel.app"
            className="underline font-pacifico hover:scale-110"
          >
            VTD
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
