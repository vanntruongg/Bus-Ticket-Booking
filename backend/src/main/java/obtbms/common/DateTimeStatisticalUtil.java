package obtbms.common;


import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Month;
import java.time.Year;
import java.time.YearMonth;
import java.util.*;

public class DateTimeStatisticalUtil {

  public static String formatDate(Date date) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
    return dateFormat.format(date);
  }

  public static int getCurrentYear() {
    Year currentYear = Year.now();
    return currentYear.getValue();
  }

  public static int getCurrentMonth() {
    LocalDate currentDate = LocalDate.now();
    return currentDate.getMonthValue();
  }

  public static Map<String, Date> getFirstAndLastDayInMonth(int month) {
    int currentYear = getCurrentYear();

    YearMonth yearMonth = YearMonth.of(currentYear, month);
    LocalDate firstDay = yearMonth.atDay(1);
    LocalDate lastDay = yearMonth.atEndOfMonth();

    Map<String, Date> firstAndLastDay = new HashMap<>();
    firstAndLastDay.put("firstDay", localDateToDate(firstDay));
    firstAndLastDay.put("lastDay", localDateToDate(lastDay));

    return firstAndLastDay;
  }

  public static List<Map<String, Date>> getFirstAndLastDayAllMonthsInYear() {
    List<Map<String, Date>> listFirstAndLastDayAllMonthsInYear = new ArrayList<>();
    for (int month = 1; month <= 12; month++) {
      listFirstAndLastDayAllMonthsInYear.add(getFirstAndLastDayInMonth(month));
    }
    return listFirstAndLastDayAllMonthsInYear;
  }


  public static Date localDateToDate(LocalDate localDate) {
    Calendar calendar = Calendar.getInstance();
    calendar.clear();
    calendar.set(Calendar.YEAR, localDate.getYear());
    calendar.set(Calendar.MONTH, localDate.getMonthValue() - 1);
    calendar.set(Calendar.DAY_OF_MONTH, localDate.getDayOfMonth());

    return calendar.getTime();
  }

  public static List<Date> getDaysInMonth(int month) {
    List<Date> daysInMonth = new ArrayList<>();

    int currentYear = getCurrentYear();
    LocalDate startDate = LocalDate.of(currentYear, month, 1);
    LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
    LocalDate currentDate = startDate;

    // chay trong khi ngay van con nam trong thang( truoc endDate) hoac la ngay cuoi thang
    while (currentDate.isBefore(endDate) || currentDate.isEqual(endDate)) {
      daysInMonth.add(localDateToDate(currentDate));
      currentDate = currentDate.plusDays(1);
    }
    return daysInMonth;
  }


  public static Map<Integer, List<Date>> getDaysOfWeekInMonth(int month) {
    Map<Integer, List<Date>> daysOfWeekInMonth = new HashMap<>();

    int currentYear = getCurrentYear();
    LocalDate startDate = LocalDate.of(currentYear, month, 1);
    LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
    LocalDate currentDate = startDate;
    int currentWeek = 1;
    int dayOfWeek = 1;
    List<Date> daysOfWeek = new ArrayList<>();
    // chay trong khi ngay van con nam trong thang( truoc endDate) hoac la ngay cuoi thang
    while (currentDate.isBefore(endDate) || currentDate.isEqual(endDate)) {
      daysOfWeek.add(localDateToDate(currentDate));

      //
      if (dayOfWeek == 7 || currentDate.isEqual(endDate)) {
        daysOfWeekInMonth.put(currentWeek, daysOfWeek);
        // tang tuan len va khoi tao lai 1 list moi
        dayOfWeek = 0;
        currentWeek++;
        daysOfWeek = new ArrayList<>();
      }
      dayOfWeek++;
      currentDate = currentDate.plusDays(1);
    }

    return daysOfWeekInMonth;
  }

  public static Map<String, Integer> monthMap() {
    Map<String, Integer> monthMap = new HashMap<>();
    monthMap.put("Tháng 1", 1);
    monthMap.put("Tháng 2", 2);
    monthMap.put("Tháng 3", 3);
    monthMap.put("Tháng 4", 4);
    monthMap.put("Tháng 5", 5);
    monthMap.put("Tháng 6", 6);
    monthMap.put("Tháng 7", 7);
    monthMap.put("Tháng 8", 8);
    monthMap.put("Tháng 9", 9);
    monthMap.put("Tháng 10", 10);
    monthMap.put("Tháng 11", 11);
    monthMap.put("Tháng 12", 12);
    return monthMap;
  }

  public static Map<String, Integer> quarterMap() {
    Map<String, Integer> quarterMap = new HashMap<>();
    quarterMap.put("Quý 1", 1);
    quarterMap.put("Quý 2", 2);
    quarterMap.put("Quý 3", 3);
    quarterMap.put("Quý 4", 4);
    return quarterMap;
  }
}
