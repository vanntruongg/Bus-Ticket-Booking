package obtbms.enums;

public enum GetTicketType {
  NEWLY_PURCHASED("newly_purchased"),
  SUCCESSFULLY_PURCHASED("purchased_successfully"),
  CANCELLED("cancelled");
  private final String value;

  GetTicketType(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }
}
