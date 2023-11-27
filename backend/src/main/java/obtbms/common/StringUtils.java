package obtbms.common;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;

import java.security.SecureRandom;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.beans.TypeMismatchException.ERROR_CODE;

public class StringUtils {
  private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  private static final int TICKET_ID_LENGTH = 6;
  private static final int PASSWORD_LENGTH = 8;

  public static String generateStringId() {
    SecureRandom random = new SecureRandom();
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < TICKET_ID_LENGTH; i++) {
      int randomIndex = random.nextInt(CHARACTERS.length());
      sb.append(CHARACTERS.charAt(randomIndex));
    }
    return sb.toString();
  }

  public static String generatePassword() {
    PasswordGenerator generator = new PasswordGenerator();

    CharacterData lowerCaseChars = EnglishCharacterData.LowerCase;
    CharacterRule lowerCseRule = new CharacterRule(lowerCaseChars);
    lowerCseRule.setNumberOfCharacters(2);

    CharacterData upperCaseChars = EnglishCharacterData.UpperCase;
    CharacterRule upperCaseRule = new CharacterRule(upperCaseChars);
    upperCaseRule.setNumberOfCharacters(2);

    CharacterData digitChars = EnglishCharacterData.Digit;
    CharacterRule digitRule = new CharacterRule(digitChars);
    digitRule.setNumberOfCharacters(2);

    CharacterData specialChars = new CharacterData() {
      @Override
      public String getErrorCode() {
        return ERROR_CODE;
      }

      @Override
      public String getCharacters() {
        return "!@#$%^&*()_+";
      }
    };

    CharacterRule splCharRule = new CharacterRule(specialChars);
    splCharRule.setNumberOfCharacters(2);

    return generator.generatePassword(PASSWORD_LENGTH, splCharRule, lowerCseRule, upperCaseRule, digitRule);
  }

  public static Map<String, Long> getTimeInTimeString(String timeString) {
    String[] indexOdMinutes = timeString.split(" ");
    Map<String, Long> times = new HashMap<>();
    times.put("hours", Long.parseLong(indexOdMinutes[0]));
    times.put("minutes", Long.parseLong(indexOdMinutes.length > 3 ? indexOdMinutes[2] : "0"));
    return times;
  }

  public static Time calculateArrivalTimeFromDepartureTimeAndJourneyDuration(Time departureTime, String journeyDuration) {
    Map<String, Long> times = getTimeInTimeString(journeyDuration);

    LocalTime toLocalTime = departureTime.toLocalTime();

    LocalTime localTime = LocalTime.of(toLocalTime.getHour(), toLocalTime.getMinute());
    localTime = localTime.plusHours(times.get("hours"));
    localTime = localTime.plusMinutes(times.get("minutes"));

    return Time.valueOf(localTime);
  }

  public static String maskEmail(String email) {
    int indexBeginDomain = email.indexOf("@");
    String firstPart = email.substring(0, indexBeginDomain);
    String domain = email.substring(indexBeginDomain);
    if (firstPart.length() < 3) {
      return "*".repeat(firstPart.length()) + domain;
    }
    firstPart = email.substring(0, 3);
    String secondPart = email.substring(3, indexBeginDomain);
    return firstPart + "*".repeat(secondPart.length()) + domain;
  }

  public static String maskPhone(String phone) {
    String firstPart = phone.substring(0, 3);
    String secondPart = phone.substring(3, 7);
    String thirdPart = phone.substring(7);

    return firstPart + "*".repeat(secondPart.length()) + thirdPart;
  }

  public static Map<String, String> getName(String fullName) {
    Map<String, String> lastNameAndFirstName = new HashMap<>();
    String[] name = fullName.split(" ");
    if (name.length == 1) {
      lastNameAndFirstName.put("lastName", "");
      lastNameAndFirstName.put("firstName", fullName);
    } else {
      int index = fullName.indexOf(" ");
      lastNameAndFirstName.put("lastName", fullName.substring(0, index));
      lastNameAndFirstName.put("firstName", fullName.substring(index));
    }
    return lastNameAndFirstName;
  }


}
