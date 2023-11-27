package obtbms.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class ApiEndpoint {
  public static final String BASE_API = "/obtbms";
  public static final String ADMIN = "/admin";
  public static final String FEEDBACK = "/feedback";

  // Authentication
  public static final String AUTH_ENDPOINT = BASE_API + "/auth";
  public static final String AUTH_LOGIN = "/login";
  public static final String AUTH_LOGOUT = "/logout";
  public static final String AUTH_REFRESH_TOKEN = "/refresh-token";
  public static final String AUTH_RESET_PASSWORD = "/reset-password";


  public static final String ASTERISK_MATCHER = "/**";

  // Actions
  public static final String GET_ALL = "/get-all";
  public static final String GET_LIST = "/get-list";
  public static final String GET = "/get";
  public static final String CREATE = "/create";
  public static final String SAVE = "/save";
  public static final String COUNT = "/count";
  public static final String SOLD = "/sold";
  public static final String UPDATE = "/update";
  public static final String DELETE = "/delete";
  public static final String CANCEL = "/cancel";
  public static final String HANDLE = "/handle";
  public static final String UPLOAD = "/upload";
  public static final String PROFILE = "/profile";
  public static final String UNUSED = "/unused";
  public static final String STATISTIC = "/statistic";
  public static final String REVENUE = "/revenue";
  public static final String YEAR = "/year";
  public static final String YEARLY = "/yearly";
  public static final String QUARTERLY = "/quarterly";
  public static final String QUARTER = "/quarter";
  public static final String MONTHLY = "/monthly";
  public static final String MONTH = "/month";
  public static final String WEEKLY = "/weekly";
  public static final String THIS_WEEK = "/this-week";
  public static final String TODAY = "/today";
  public static final String BOOKING_TODAY = "/booking-today";
  public static final String SCHEDULE = "/schedule";
  public static final String WEEK = "/week";
  public static final String REPORT = "/report";
  public static final String NEWLY = "/newly";
  public static final String PURCHASE = "/purchase";
  public static final String SUCCESS = "/success";


  // Entity
  public static final String USER_GET = "/user";
  public static final String USER_GET_ALL = "/users";
  public static final String USER_COUNT = USER_GET_ALL + COUNT;
  public static final String USER_CREATE = USER_GET + CREATE;
  public static final String USER_CREATE_BY_ADMIN = USER_GET + ADMIN + CREATE;
  public static final String USER_UPDATE = USER_GET + UPDATE;
  public static final String USER_UPDATE_BY_ADMIN = USER_GET + ADMIN + UPDATE;


  public static final String PASSWORD = "/password";
  public static final String FORGOT_PASSWORD = USER_GET +  "/forgot-password";
  public static final String RESET_PASSWORD = USER_GET + "/reset-password";
  public static final String CHANGE_PASSWORD = USER_GET + "/change-password";
  public static final String LOCATION_GET = "/location";
  public static final String LOCATION_GET_ALL = "/locations";
  public static final String TRIP_GET = "/trip";
  public static final String TRIP_GET_ALL = "/trips";
  public static final String SEAT_GET = "/seat";
  public static final String SEAT_GET_ALL = "/seats";
  public static final String TICKET_GET = "/ticket";
  public static final String TICKET_GET_ALL = "/tickets";
  public static final String ROUTE_POINT_GET = "/route-point";
  public static final String ROUTE_POINT_GET_ALL = "/route-points";

  public static final String ROUTE_GET = "/route";
  public static final String ROUTE_GET_ALL = "/routes";

  public static final String BUS_GET = "/bus";
  public static final String BUS_GET_ALL = "/buses";
  // Parameter

  public static final String ID = "id";
  public static final String ID_PARAM = "/{id}";
  public static final String EMAIL = "/email";
  public static final String EMAIL_PARAM = "/{email}";
  public static final String ORIGIN_PARAM = "/{origin}";
  public static final String DESTINATION_PARAM = "/{destination}";
  public static final String TRIP_DATE_PARAM = "/{tripDate}";
  public static final String TRIP_DATE = "/tripDate";
  public static final String GROUP_BY = "/group-by";
  public static final String CODE = "/{code}";
  public static final String LOCATION_CODE = "/{locationCode}";

  // File
  public static final String IMAGE = "/image";
  public static final String UPLOAD_IMAGE = UPLOAD + IMAGE;



  // checkout
  public static final String PAYMENT = "/payment";
  public static final String CREATE_ORDER_PAYMENT = PAYMENT + "/create-order";

  public static final String TYPE = "/type";
  public static final String DISABLE = "/disable";



  public static final String TRIP_CREATE = TRIP_GET + CREATE;
  public static final String TRIP_UPDATE = TRIP_GET + UPDATE;
  public static final String TRIP_DELETE = TRIP_GET + DELETE;
  public static final String TRIP_GET_BY_ID = TRIP_GET + ID_PARAM;
  public static final String TRIP_GET_ALL_BY_DATE = TRIP_GET_ALL  + TRIP_DATE;
  public static final String TRIP_GET_ALL_BY_WEEK = TRIP_GET_ALL  + WEEK;
  public static final String TRIP_GET_ALL_SCHEDULE_BY_WEEK = TRIP_GET_ALL + SCHEDULE + WEEK;
  public static final String SEAT_GET_BY_TRIP_AND_TRIP_DATE = SEAT_GET + TRIP_GET;
  public static final String ROUTE_POINT_GET_BY_TRIP = ROUTE_POINT_GET + TRIP_GET + ID_PARAM;
  public static final String LOCATION_GET_BY_CODE = LOCATION_GET + CODE;
  public static final String TICKET_CREATE_NEW_BOOKING = TICKET_GET + CREATE;
  public static final String TICKET_CANCEL = TICKET_GET + CANCEL + ID_PARAM;
  public static final String TICKET_GET_BY_EMAIL = TICKET_GET_ALL + EMAIL;
  public static final String TICKET_GET_BY_PHONE_AND_TICKET_ID = TICKET_GET;
  public static final String TICKET_GET_ALL_SOLD_TODAY = TICKET_GET_ALL + COUNT + TODAY;
  public static final String TICKET_GET_ALL_NEWLY_PURCHASE = TICKET_GET_ALL + NEWLY + PURCHASE;
  public static final String TICKET_GET_ALL_PURCHASE_SUCCESS = TICKET_GET_ALL + PURCHASE + SUCCESS;
  public static final String TICKET_GET_ALL_CANCELED = TICKET_GET_ALL + CANCEL;
  public static final String TICKET_GET_ALL_BY_TYPE = TICKET_GET_ALL + TYPE;
  public static final String SEAT_GET_ALL_BY_TICKET_ID = SEAT_GET_ALL + TICKET_GET + ID_PARAM;
  public static final String ROUTE_CREATE = ROUTE_GET + CREATE;
  public static final String ROUTE_UPDATE = ROUTE_GET + UPDATE;
  public static final String ROUTE_DELETE = ROUTE_GET + DELETE + ID_PARAM;
  public static final String ROUTE_GET_ALL_AND_GROUP_BY = ROUTE_GET_ALL + GROUP_BY;
  public static final String ROUTE_GET_ALL_BY_ORIGIN = ROUTE_GET_ALL + LOCATION_CODE;
  public static final String BUS_GET_ALL_UNUSED = BUS_GET_ALL + UNUSED;
  public static final String STATISTIC_REVENUE_YEARLY = STATISTIC + REVENUE + YEARLY;
  public static final String STATISTIC_REVENUE_QUARTERLY = STATISTIC + REVENUE + QUARTERLY;
  public static final String STATISTIC_REVENUE_MONTHLY = STATISTIC + REVENUE + MONTHLY;
  public static final String STATISTIC_REVENUE_WEEKLY = STATISTIC + REVENUE + WEEKLY;
  public static final String STATISTIC_REVENUE_THIS_WEEK = STATISTIC + REVENUE + THIS_WEEK;
  public static final String STATISTIC_TICK_SOLD_THIS_WEEK = STATISTIC + TICKET_GET + SOLD + THIS_WEEK;
  public static final String STATISTIC_TICK_COUNT_TODAY = STATISTIC + TICKET_GET  + COUNT+ TODAY;
  public static final String STATISTIC_TICK_COUNT_BOOKING_TODAY = STATISTIC + TICKET_GET  + COUNT+ BOOKING_TODAY;
  public static final String STATISTIC_USER_COUNT = STATISTIC + USER_GET + COUNT;
  public static final String STATISTIC_GET_REPORT_QUARTER = STATISTIC +  REVENUE + REPORT + QUARTER;
  public static final String STATISTIC_GET_REPORT_MONTH = STATISTIC + REVENUE + REPORT + MONTH;
  public static final String EXPORT_REVENUE_REPORT = "/revenue-report";
  public static final String EXPORT_REVENUE_REPORT_YEAR = EXPORT_REVENUE_REPORT + YEAR;
  public static final String EXPORT_REVENUE_REPORT_QUARTER = EXPORT_REVENUE_REPORT + QUARTER;
  public static final String EXPORT_REVENUE_REPORT_MONTH = EXPORT_REVENUE_REPORT + MONTH;

  public static final String DISABLE_ACCOUNT = USER_GET + DISABLE + EMAIL_PARAM;
}
