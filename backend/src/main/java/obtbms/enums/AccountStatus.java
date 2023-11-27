package obtbms.enums;

public enum AccountStatus {
  UNREGISTER(0),
  ACTIVE(1),
  DISABLE(2);
  private final int value;

  AccountStatus(int value) {
    this.value = value;
  }

  public int getValue() {
    return value;
  }
}
