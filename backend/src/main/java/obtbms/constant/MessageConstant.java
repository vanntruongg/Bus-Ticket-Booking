package obtbms.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class MessageConstant {

  public static final String CHAR_SEQUENCE_2 = "%s %s";
  public static final String CHAR_SEQUENCE_3 = "%s %s %s";
  public static final String CHAR_SEQUENCE_4 = "%s %s %s %s";
  public static final String CHAR_SEQUENCE_5 = "%s %s %s %s %s";



  // Entity
  public static final String USER = "User";
  public static final String ROLE = "Role";

  // Parameter
  public static final String EMAIL = "email";
  public static final String ROUTE = "Route";


  // Action

  public static final String REQUEST = "Request";
  public static final String GET = "Get";

  public static final String GET_ALL = "Get all";
  public static final String CREATE = "Create";
  public static final String SAVE = "Save";
  public static final String DELETE = "Delete";
  public static final String UPDATE = "Update";
  public static final String FIND = "Find";
  public static final String RESET = "Reset";
  public static final String UPLOAD = "Upload";
  public static final String CHANGE = "change";
  public static final String CANCEL = "Cancel";


  // Status
  public static final String STATUS = "Status";
  public static final String NOT_CORRECT = "Not Correct";
  public static final String NOT_FOUND = "Not found";
  public static final String SUCCESSFULLY = "Successfully!";
  public static final String DENIED = "denied";
  public static final String FORBIDDEN = "was Forbidden";
  public static final String EXISTED = "Existed";
  public static final String FAIL = "Failed!";
  public static final String INCORRECT = "Incorrect";
  public static final String INVALID = "Invalid!";
  public static final String EXPIRED = "Expired!";

  // Common
  public static final String PHONE_NUMBER = "Phone number";
  public static final String LOGIN = "Login";
  public static final String LOGOUT = "Logout";
  public static final String PASSWORD = "Password";
  public static final String TOKEN = "Token";

  public static final String REGISTERED = " has already registered ! ";
  public static final String DATA_EMPTY = "Data is empty !";
  public static final String NOT_SAVE_FILE = "Could not save image file!";
  public static final String EMAIL_EXISTED = "Email was existed!";
  public static final String PHONE_EXISTED = "Phone number was existed!";
  public static final String DATA_INTEGRITY_VIOLATION = "It cannot be deleted because it is associated with other data.";
  public static final String DUPLICATE_ORIGIN_AND_DESTINATION = "Duplicated origin and destination points are not allowed in the system!";
  public static final String ACCOUNT_DISABLE = " Account has been disabled!";



  public static final String ROUTE_EXISTED = "Route was existed!";
  public static final String FIND_SUCCESS = String.format(CHAR_SEQUENCE_2, FIND, SUCCESSFULLY);
  public static final String UPDATE_SUCCESS = String.format(CHAR_SEQUENCE_2, UPDATE, SUCCESSFULLY);
  public static final String CREATE_SUCCESS = String.format(CHAR_SEQUENCE_2, CREATE, SUCCESSFULLY);
  public static final String DELETE_NOT_FOUND = String.format(CHAR_SEQUENCE_2, DELETE, NOT_FOUND);
  public static final String DELETE_SUCCESS = String.format(CHAR_SEQUENCE_2, DELETE, SUCCESSFULLY);

  // Auth
  public static final String LOGIN_SUCCESS = String.format(CHAR_SEQUENCE_2, LOGIN, SUCCESSFULLY);
  public static final String LOGOUT_SUCCESS = String.format(CHAR_SEQUENCE_2, LOGOUT, SUCCESSFULLY);
  public static final String PASSWORD_INCORRECT = String.format(CHAR_SEQUENCE_2, PASSWORD, INCORRECT);
  public static final String OLD_PASSWORD_INCORRECT = "Old password is incorrect";
  public static final String PASSWORD_CHANGE_SUCCESS = String.format(CHAR_SEQUENCE_3, PASSWORD, CHANGE, SUCCESSFULLY);
  public static final String PASSWORD_CHANGE_FAIL = String.format(CHAR_SEQUENCE_3, PASSWORD, CHANGE, FAIL);
  public static final String RESET_PASSWORD_SUCCESS = String.format(CHAR_SEQUENCE_3, RESET, PASSWORD, SUCCESSFULLY);
  public static final String RESET_PASSWORD_FAIL = String.format(CHAR_SEQUENCE_3, RESET, PASSWORD, FAIL);
  public static final String REFRESH_TOKEN_FAIL = String.format(CHAR_SEQUENCE_3, RESET, TOKEN, FAIL);

  public static final String REQUEST_RESET_PASSWORD_SUCCESS = String.format(CHAR_SEQUENCE_4, REQUEST, RESET, PASSWORD, SUCCESSFULLY);
  public static final String REQUEST_RESET_PASSWORD_FAIL = String.format(CHAR_SEQUENCE_4, REQUEST, RESET, PASSWORD, FAIL);


  public static final String TOKEN_INVALID = String.format(CHAR_SEQUENCE_2, TOKEN, INVALID);
  public static final String TOKEN_EXPIRED = String.format(CHAR_SEQUENCE_2, TOKEN, EXPIRED);

  // User
  public static final String USER_NOT_FOUND = String.format(CHAR_SEQUENCE_2, USER, NOT_FOUND);
  public static final String USER_FORBIDDEN = String.format(CHAR_SEQUENCE_2, USER, FORBIDDEN);


  // File (upload image)
  public static final String FILE = "File";
  public static final String URL = "url";
  public static final String UPLOAD_FILE_SUCCESS = String.format(CHAR_SEQUENCE_3, UPLOAD, FILE, SUCCESSFULLY);
  public static final String UPLOAD_FILE_FAIL = String.format(CHAR_SEQUENCE_3, UPLOAD, FILE, FAIL);
  public static final String CHANGE_STATUS_ACCOUNT_SUCCESS = " account successfully!";

}
