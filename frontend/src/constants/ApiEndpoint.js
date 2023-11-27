export const AUTH_ENDPOINT = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  REFRESH_TOKEN: 'auth/refresh-token',
};

export const USER = {
  GET_USER: '/user',
  GET_ALL_USER: '/users',
  CREATE_USER: '/user/admin/create',
  UPDATE_USER: '/user/update',
  UPDATE_USER_BY_ADMIN: '/user/admin/update',
  DELETE_USER: '/user/disable',
  RESGISTER: '/user/create',
  FORGOT_PASSWORD: '/user/forgot-password',
  RESET_PASSWORD: '/user/reset-password',
  CHANGE_PASSWORD: '/user/change-password',
  FEEDBACK: '/feedback',
};

export const LOCATION = {
  LOCATION_GET: '/location',
  LOCATION_GET_ALL: '/locations',
  LOCATION_GET_BY_CODE: '/location',
};

export const TRIP = {
  GET_ALL: '/trips',
  GET_ALL_BY_MONTH: '/trips/month',
  GET_ALL_BY_WEEK: '/trips/week',
  GET_ALL_BY_DATE: '/trips/tripDate',
  GET_ALL_SCHEDULE_BY_WEEK: '/trips/schedule/week',
  CREATE_TRIP: '/trip/create',
  UPDATE_TRIP: '/trip/update',
  DELETE_TRIP: '/trip/delete',
};

export const PAYMENT = {
  CREATE_ORDER: '/payment/create-order',
};

export const TICKET = {
  GET: '/ticket',
  GET_ALL: '/tickets',
  GET_ALL_BY_EMAIL: '/tickets/email',
  CREATE_NEW_TICKET_BOOKING: '/ticket/create',
  CANCEL_TICKET: '/ticket/cancel',
  GET_ALL_BY_TYPE: '/tickets/type',
};

export const SCHEDULE = {
  GET_ALL: '/routes/group-by',
};

export const SEAT = {
  GET_BY_TRIP_ID: '/seat/trip',
};

export const ROUTE = {
  GET: '/route',
  GET_ALL: '/routes',
  GET_ALL_GROUP_BY: '/routes/group-by',
  CREATE_ROUTE: '/route/create',
  UPDATE_ROUTE: '/route/update',
  DELETE_ROUTE: '/route/delete',
};

export const BUS = {
  GET: '/bus',
  GET_ALL: '/buses',
  GET_ALL_UNUSED: '/buses/unused',
};

export const STATISTIC = {
  YEARLY_REVENUE: '/statistic/revenue/yearly',
  QUARTERLY_REVENUE: '/statistic/revenue/quarterly',
  MONTHLY_REVENUE: '/statistic/revenue/monthly',
  WEEKLY_REVENUE: '/statistic/revenue/weekly',
  THIS_WEEK_REVENUE: '/statistic/revenue/this-week',
  TOTAL_TICKET_USED_TODAY: '/statistic/ticket/count/today',
  TOTAL_TICKET_BOOKING_TODAY: '/statistic/ticket/count/booking-today',
  TOTAL_USERS: '/statistic/user/count',
  TICKET_SOLD_THIS_WEEK: '/statistic/ticket/sold/this-week',
  EXPORT_REVENUE_REPORT_YEAR: '/revenue-report/year',
  EXPORT_REVENUE_REPORT_QUARTER: '/revenue-report/quarter',
  EXPORT_REVENUE_REPORT_MONTH: '/revenue-report/month',
};
