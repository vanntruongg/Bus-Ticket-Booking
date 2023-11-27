import { lazy } from 'react';
import { PathRoutesUser, PathRoutesAdmin } from '../constants/PathRoutes';
import AuthLayout from '@/layout/AuthLayout';
import BookingLayout from '@/layout/BookingLayout';
import DefaultLayout from '@/layout/LayoutAdmin/DefaultLayout';
import AccountInformationLayout from '@/layout/AccountInfomationLayout';

export const Schedule = lazy(() => import('@/pages/user/Schedule'));
export const Home = lazy(() => import('@/pages/user/Home'));
export const CheckOut = lazy(() => import('@/pages/user/CheckOut'));
export const NotFound = lazy(() => import('@/pages/NotFound'));
export const Login = lazy(() => import('@/pages/Auth/Login'));
export const Register = lazy(() => import('@/pages/Auth/Register'));
export const Booking = lazy(() => import('@/pages/user/Booking'));
export const ListSearchTrip = lazy(() => import('@/pages/user/ListSearchTrip'));
export const SearchTicket = lazy(() => import('@/pages/user/SearchTicket'));
export const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));
export const ResetPassword = lazy(() => import('@/pages/Auth/ResetPassword'));
export const PersonalInformation = lazy(() =>
  import('@/pages/user/Account/PersonalInformation'),
);
export const HistoryBuyTicket = lazy(() =>
  import('@/pages/user/Account/HistoryBuyTicket'),
);
export const ChangePassword = lazy(() =>
  import('@/pages/user/Account/ChangePassword'),
);
export const TicketBookingInformation = lazy(() =>
  import('@/pages/user/Booking/components/TicketBookingInformation'),
);
export const Statistical = lazy(() => import('@/pages/admin/Statistical'));
export const ListUser = lazy(() =>
  import('@/pages/admin/UserManagement/ListUser'),
);
export const ListRoute = lazy(() =>
  import('@/pages/admin/RouteManagement/ListRoute'),
);
export const BusSchedule = lazy(() => import('@/pages/admin/BusSchedule'));
export const TicketBookingGuide = lazy(() =>
  import('@/pages/user/TicketBookingGuide'),
);
export const Contact = lazy(() => import('@/pages/user/Contact'));
export const TripManagement = lazy(() =>
  import('@/pages/admin/TripManagement'),
);
export const TicketManagement = lazy(() =>
  import('@/pages/admin/TicketManagement'),
);
export const Forbidden = lazy(() => import('@/pages/Forbidden'));

const publicRoutes = [
  { path: PathRoutesUser.HOME, component: Home },
  // auth
  { path: PathRoutesUser.LOGIN, component: Login, layout: AuthLayout },
  { path: PathRoutesUser.REGISTER, component: Register, layout: AuthLayout },
  {
    path: PathRoutesUser.FORGOT_PASSWORD,
    component: ForgotPassword,
    layout: AuthLayout,
  },
  {
    path: PathRoutesUser.RESET_PASSWORD,
    component: ResetPassword,
    layout: AuthLayout,
  },

  // page
  { path: PathRoutesUser.HOME_PAGE, component: Home },
  {
    path: PathRoutesUser.SEARCH_TRIP,
    component: ListSearchTrip,
  },

  { path: PathRoutesUser.CHECKOUT, component: CheckOut },
  { path: PathRoutesUser.SCHEDULE, component: Schedule },
  { path: PathRoutesUser.SEARCH_TICKET, component: SearchTicket },
  { path: PathRoutesUser.CONTACT, component: Contact },
  { path: PathRoutesUser.BOOKING, component: Booking, layout: BookingLayout },
  {
    path: PathRoutesUser.TICKET_BOOKING_INFORMATION,
    component: TicketBookingInformation,
  },
  {
    path: PathRoutesUser.TICKET_BOOKING_GUIDE,
    component: TicketBookingGuide,
  },
  {
    path: PathRoutesUser.NOT_FOUND,
    component: NotFound,
  },
  { path: PathRoutesUser.FORBIDDEN, component: Forbidden },
];
const privateRoutes = [
  {
    path: PathRoutesUser.PERSONAL_INFORMATION,
    component: PersonalInformation,
    layout: AccountInformationLayout,
  },
  {
    path: PathRoutesUser.HISTORY_RESERVATION,
    component: HistoryBuyTicket,
    layout: AccountInformationLayout,
  },
  {
    path: PathRoutesUser.CHANGE_PASSWORD,
    component: ChangePassword,
    layout: AccountInformationLayout,
  },
];

const adminRoutes = [
  // admin

  {
    path: PathRoutesAdmin.USERS,
    component: ListUser,
    layout: DefaultLayout,
  },
  {
    path: PathRoutesAdmin.ROUTES,
    component: ListRoute,
    layout: DefaultLayout,
  },
  {
    path: PathRoutesAdmin.TRIPS,
    component: TripManagement,
    layout: DefaultLayout,
  },
];

const employeeRoutes = [
  {
    path: PathRoutesAdmin.STATISTICAL,
    component: Statistical,
    layout: DefaultLayout,
  },
  {
    path: PathRoutesAdmin.TICKETS,
    component: TicketManagement,
    layout: DefaultLayout,
  },
  {
    path: PathRoutesAdmin.BUS_SCHEDULE,
    component: BusSchedule,
    layout: DefaultLayout,
  },
];

export { publicRoutes, privateRoutes, adminRoutes, employeeRoutes };
