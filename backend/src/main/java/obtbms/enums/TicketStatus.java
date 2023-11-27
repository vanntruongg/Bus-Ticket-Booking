package obtbms.enums;

public enum TicketStatus {
  SUCCESS("Thành công"),
  CANCELLED("Đã hủy");

  private final String value;

  TicketStatus(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }
}
