import { PathRoutesUser } from '@/constants/PathRoutes';
import { NavLink } from 'react-router-dom';

const links = [
  {
    to: PathRoutesUser.HOME,
    label: 'Trang chủ',
  },
  {
    to: PathRoutesUser.SCHEDULE,
    label: 'Lịch trình',
  },
  {
    to: PathRoutesUser.SEARCH_TICKET,
    label: 'Tra cứu vé',
  },
  {
    to: PathRoutesUser.TICKET_BOOKING_GUIDE,
    label: 'Hướng dẫn',
  },
  {
    to: PathRoutesUser.CONTACT,
    label: 'Liên hệ',
  },
];

const Nav = () => {
  return (
    <ul className="flex justify-around text-gray-50 uppercase font-semibold font-openSans">
      {links.map((link, index) => (
        <li key={index} className="">
          <NavLink to={link.to}>
            <h4 className={`mx-4 py-2 relative group`}>
              {link.label}
              <span
                className={`
                absolute bottom-0 bg-gradient-to-r from-primary-400 to-primary-600 h-0.5 transitioj-all duration-300 group-hover:w-full group-hover:left-0
                ${
                  location.pathname === link.to
                    ? 'w-full left-0'
                    : 'w-0 left-[50%]'
                }
                `}
              ></span>
            </h4>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
