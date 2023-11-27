export const PathRoutesUser = {
  HOME: '/',
  // auth
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  FORGOT_PASSWORD: '/quen-mat-khau',
  RESET_PASSWORD: '/dat-lai-mat-khau',
  // page
  HOME_PAGE: '/trang-chu',
  SEARCH_TRIP: '/tim-chuyen-xe',
  SCHEDULE: '/lich-trinh',
  SEARCH_TICKET: '/tra-cuu-ve',
  CONTACT: '/lien-he',
  CHECKOUT: '/thanh-toan',
  BOOKING: '/dat-ve',
  TICKET_BOOKING_INFORMATION: '/thong-tin-dat-ve',
  TICKET_BOOKING_GUIDE: '/huong-dan-dat-ve',
  PERSONAL_INFORMATION: '/thong-tin-tai-khoan/thong-tin-chung',
  HISTORY_RESERVATION: '/thong-tin-tai-khoan/lich-su-mua-ve',
  CHANGE_PASSWORD: '/thong-tin-tai-khoan/doi-mat-khau',

  NOT_FOUND: '/not-found',
  FORBIDDEN: '/forbidden',
};

export const PathRoutesAdmin = {
  ADMIN: '/admin',
  STATISTICAL: '/admin/statistical',
  BUS_SCHEDULE: '/admin/bus-schedule',
  USERS: '/admin/users',
  BOOKING: '/admin/bookings',
  ROUTES: '/admin/routes',
  TRIPS: '/admin/trips',
  TICKETS: '/admin/tickets',
};
