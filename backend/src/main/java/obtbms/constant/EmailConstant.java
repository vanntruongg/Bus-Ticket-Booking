package obtbms.constant;


import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.NONE)
public class EmailConstant {

  public static final String UTF_8 = "UTF-8";
  public static final String EMAILS = "emails";
  public static final String SLASH = "/";
  public static final String VT_BUS_TICKET_BOOKING = "VT Bus Ticket Booking";

  // Template name
  public static final String RESET_PASSWORD = "reset_password";
  public static final String RESET_PASSWORD_SUBJECT = "[" + VT_BUS_TICKET_BOOKING + "]" + " Yêu cầu đặt lại mật khẩu.";
  public static final String INFO_TICKET = "info_ticket";
  public static final String CREATE_ACCOUNT = "create_account";
  public static final String FEEDBACK = "feedback";



  // Classpath
  public static final String CLASSPATH_RESET_PASSWORD = EMAILS + SLASH + RESET_PASSWORD;
  public static final String CLASSPATH_INFO_TICKET = EMAILS + SLASH + INFO_TICKET;
  public static final String CLASSPATH_CREATE_ACCOUNT = EMAILS + SLASH + CREATE_ACCOUNT;
  public static final String CLASSPATH_FEEDBACK = EMAILS + SLASH + FEEDBACK;


  public static final String FROM_NAME = "fromName";
  public static final String FROM_EMAIL = "fromEmail";
  public static final String TO_NAME = "toName";
  public static final String TO_EMAIL = "toEmail";
  public static final String NEW_PASSWORD = "newPassword";

//  public static final String RESET_PASSWORD_SUBJECT = "[" + VT_BUS_TICKET_BOOKING + "]" + " Reset Password";

}
