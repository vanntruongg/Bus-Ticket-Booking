package obtbms.service.impl;

import lombok.RequiredArgsConstructor;
import obtbms.common.DateTimeStatisticalUtil;
import obtbms.constant.CommonConstant;
import obtbms.entity.dto.RevenueResponse;
import obtbms.repository.TicketRepository;
import obtbms.repository.UserRepository;
import obtbms.service.StatisticalService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class StatisticalServiceImpl implements StatisticalService {

  private final TicketServiceImpl ticketService;
  private final TicketRepository ticketRepository;
  private final UserRepository userRepository;

  @Override
  public List<RevenueResponse> yearlyRevenue() {
    // object result
    List<RevenueResponse> yearlyRevenue = new ArrayList<>();
    for (int month = 1; month <= 12; month++) {
      RevenueResponse revenueResponse = new RevenueResponse();

      Map<String, Object> revenueAndDate = getRevenueInMonth(month);

      revenueResponse.setDescription(CommonConstant.MONTH + " " + month);
      revenueResponse.setStartDate((Date) revenueAndDate.get("firstDay"));
      revenueResponse.setEndDate((Date) revenueAndDate.get("lastDay"));
      revenueResponse.setValue((float) revenueAndDate.get("totalRevenue"));

      yearlyRevenue.add(revenueResponse);
    }
    return yearlyRevenue;
  }

  @Override
  public List<RevenueResponse> quarterlyRevenue() {
    List<RevenueResponse> quarterlyRevenue = new ArrayList<>();
    int numberOfMonthsInQuarter = 3;
    int quarter = 1;
    float totalRevenueQuarter = 0f;
    Date firstDayOfQuarter = null;
    for (int month = 1; month <= 12; month++) {
      RevenueResponse revenueResponse = new RevenueResponse();
      Map<String, Object> revenueAndDate = getRevenueInMonth(month);
      totalRevenueQuarter += (float) revenueAndDate.get("totalRevenue");

      if (firstDayOfQuarter == null) {
        firstDayOfQuarter = (Date) revenueAndDate.get("firstDay");
      }
      if (month / numberOfMonthsInQuarter == quarter) {
        revenueResponse.setDescription(CommonConstant.QUARTER + " " + quarter);
        revenueResponse.setStartDate(firstDayOfQuarter);
        revenueResponse.setEndDate((Date) revenueAndDate.get("lastDay"));
        revenueResponse.setValue(totalRevenueQuarter);
        quarterlyRevenue.add(revenueResponse);
        quarter++;
        totalRevenueQuarter = 0f;
        firstDayOfQuarter = null;
      }
    }
    return quarterlyRevenue;
  }

  // reuse
  private Map<String, Object> getRevenueInMonth(int month) {
    Map<String, Object> revenueAndDate = new HashMap<>();

    Map<String, Date> firstAndLastDay = DateTimeStatisticalUtil.getFirstAndLastDayInMonth(month);
    Date firstDay = firstAndLastDay.get("firstDay");
    Date lastDay = firstAndLastDay.get("lastDay");
    float totalRevenue = Objects.requireNonNullElse(ticketService.getAllRevenueInYear(firstDay, lastDay), 0f);
    revenueAndDate.put("firstDay", firstDay);
    revenueAndDate.put("lastDay", lastDay);
    revenueAndDate.put("totalRevenue", totalRevenue);

    return revenueAndDate;
  }

  @Override
  public List<RevenueResponse> monthlyRevenue(int month) {
    // object result
    List<RevenueResponse> monthlyRevenue = new ArrayList<>();
    Map<Integer, List<Date>> lists = DateTimeStatisticalUtil.getDaysOfWeekInMonth(month);
    for (Map.Entry<Integer, List<Date>> entry : lists.entrySet()) {
      RevenueResponse revenueResponse = new RevenueResponse();

      Integer key = entry.getKey();
      List<Date> dateList = entry.getValue();
      if (!dateList.isEmpty()) {
        Date startDay = dateList.get(0);
        Date endDay = dateList.get(dateList.size() - 1);

        float totalRevenue = Objects.requireNonNullElse(ticketService.getAllRevenueInMonth(startDay, endDay), 0f);

        revenueResponse.setDescription(CommonConstant.WEEK + " " + key);
        revenueResponse.setStartDate(startDay);
        revenueResponse.setEndDate(endDay);
        revenueResponse.setValue(totalRevenue);

        monthlyRevenue.add(revenueResponse);
      }
    }
    return monthlyRevenue;
  }

  @Override
  public List<RevenueResponse> weeklyRevenue(int month, int week) {
    Map<Integer, List<Date>> daysOfWeekInMonth = DateTimeStatisticalUtil.getDaysOfWeekInMonth(month);
    List<Date> daysOfWeek = daysOfWeekInMonth.get(week);

    List<RevenueResponse> weeklyRevenue = new ArrayList<>();
    for (Date date : daysOfWeek) {
      RevenueResponse revenueResponse = new RevenueResponse();
      Float revenue = ticketService.getTotalRevenueInDay(date);
      revenueResponse.setDescription(DateTimeStatisticalUtil.formatDate(date));
      revenueResponse.setValue(Objects.requireNonNullElse(revenue, 0f));
      weeklyRevenue.add(revenueResponse);
    }
    return weeklyRevenue;
  }

  @Override
  public List<RevenueResponse> getRevenueThisWeek() {
    int currentWeekInMonth = getCurrentWeekInMonth().get(0);
    int currentMonth = getCurrentWeekInMonth().get(1);
    return weeklyRevenue(currentMonth, currentWeekInMonth);
  }

  private List<Integer> getCurrentWeekInMonth() {
    LocalDate currentDate = LocalDate.now();
    int dayOfMonth = currentDate.getDayOfMonth(); // lay ngay hien tai trong thang
    int currentWeekInMonth = (dayOfMonth - 1) / 7 + 1; // lấy ra tuần mấy trong tháng
    int currentMonth = DateTimeStatisticalUtil.getCurrentMonth();
    return List.of(currentWeekInMonth, currentMonth);
  }

  @Override
  public Integer getTotalTicketUsedToday() {
    Date today = new Date();
    return ticketRepository.countTicketByTripDate(today);
  }

  @Override
  public Integer getTotalTicketBookingToday() {
    Date today = new Date();
    return ticketRepository.countTicketByBookingDate(today);
  }

  @Override
  public int countTotalUsers() {
    return userRepository.countTotalUsers();
  }

  @Override
  public List<RevenueResponse> getTotalTicketsSoldThisWeek() {
    int currentWeekInMonth = getCurrentWeekInMonth().get(0);
    int currentMonth = getCurrentWeekInMonth().get(1);

    Map<Integer, List<Date>> daysOfWeekInMonth = DateTimeStatisticalUtil.getDaysOfWeekInMonth(currentMonth);
    List<Date> daysOfWeek = daysOfWeekInMonth.get(currentWeekInMonth);

    List<RevenueResponse> thisWeekTicketSold = new ArrayList<>();
    for (Date date : daysOfWeek) {
      RevenueResponse revenueResponse = new RevenueResponse();
      float tickets = (float) ticketService.getTotalTicketSoldInDay(date);
      revenueResponse.setDescription(DateTimeStatisticalUtil.formatDate(date));
      revenueResponse.setValue(tickets);
      thisWeekTicketSold.add(revenueResponse);
    }
    return thisWeekTicketSold;
  }

  @Override
  public byte[] getRevenueReportByYear() {
    List<RevenueResponse> revenueInYear = yearlyRevenue();
    Map<String, Float> revenueResponse = new HashMap<>();

    for (RevenueResponse revenue : revenueInYear) {
      revenueResponse.put(revenue.getDescription(), revenue.getValue());
    }
    return createExcelFile(revenueResponse, CommonConstant.YEAR);

  }

  @Override
  public byte[] getRevenueReportByQuarter() {
    List<RevenueResponse> revenueInQuarter = quarterlyRevenue();
    Map<String, Float> revenueResponse = new HashMap<>();

    for (RevenueResponse revenue : revenueInQuarter) {
      revenueResponse.put(revenue.getDescription(), revenue.getValue());
    }
    return createExcelFile(revenueResponse, CommonConstant.QUARTER);
  }

  @Override
  public byte[] getRevenueReportByMonth(int month) {
    List<Date> daysInMonth = DateTimeStatisticalUtil.getDaysInMonth(month);
    Map<String, Float> revenueResponseList = new HashMap<>();

    for (Date date : daysInMonth) {
      Float revenue = ticketService.getTotalRevenueInDay(date);
      revenueResponseList.put(DateTimeStatisticalUtil.formatDate(date), Objects.requireNonNullElse(revenue, 0f));
    }
    return createExcelFile(revenueResponseList, CommonConstant.MONTH);
  }

//  @Override
//  public byte[] getRevenueReportInQuarter(int quarter) {
//    ByteArrayOutputStream baos = new ByteArrayOutputStream();
//    return baos.toByteArray();
//  }
//
//  @Override
//  public byte[] getRevenueReportInMonth(int month) {
//    List<Date> daysInMonth = DateTimeStatisticalUtil.getDaysInMonth(month);
//    Map<String, Float> revenueResponseList = new HashMap<>();
//
//    for (Date date : daysInMonth) {
//      Float revenue = ticketService.getTotalRevenueInDay(date);
//      revenueResponseList.put(DateTimeStatisticalUtil.formatDate(date), Objects.requireNonNullElse(revenue, 0f));
//    }
//    return createExcelFile(revenueResponseList);
//  }

  private byte[] createExcelFile(Map<String, Float> revenue, String type) {
    // Tạo một tệp Excel mới
    try (Workbook workbook = new XSSFWorkbook()) {
      // Tạo một trang tính trong tệp Excel
      Sheet sheet = workbook.createSheet("DoanhThu");

      CellStyle headerCellStyle = workbook.createCellStyle();
      headerCellStyle.setAlignment(HorizontalAlignment.CENTER);
      headerCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
      Font headerFont = workbook.createFont();
      headerFont.setBold(true);
      headerFont.setColor(IndexedColors.WHITE.getIndex());
      headerCellStyle.setFont(headerFont);
      headerCellStyle.setFillForegroundColor(IndexedColors.SKY_BLUE.getIndex());
      headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

      // Tạo dòng đầu tiên cho tiêu đề
      Row headerRow = sheet.createRow(0);
      headerRow.createCell(0).setCellValue(CommonConstant.STT);
      headerRow.getCell(0).setCellStyle(headerCellStyle);
      headerRow.createCell(1).setCellValue(CommonConstant.TIME);
      headerRow.getCell(1).setCellStyle(headerCellStyle);
      headerRow.createCell(2).setCellValue(CommonConstant.TOTAL_REVENUE);
      headerRow.getCell(2).setCellStyle(headerCellStyle);

      List<Map.Entry<String, Float>> sortedList = new ArrayList<>(revenue.entrySet());
      sortedList.sort(new Comparator<Map.Entry<String, Float>>() {
        @Override
        public int compare(Map.Entry<String, Float> entry1, Map.Entry<String, Float> entry2) {

          try {
            if (CommonConstant.MONTH.equalsIgnoreCase(type)) {
              SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy"); // Định dạng ngày tháng
              Date date1 = sdf.parse(entry1.getKey());
              Date date2 = sdf.parse(entry2.getKey());
              return date1.compareTo(date2);
            } else if (CommonConstant.QUARTER.equalsIgnoreCase(type)) {
              return Integer.compare(DateTimeStatisticalUtil.quarterMap().get(entry1.getKey()),DateTimeStatisticalUtil.quarterMap().get(entry2.getKey()));
            } else {
              return Integer.compare(DateTimeStatisticalUtil.monthMap().get(entry1.getKey()),DateTimeStatisticalUtil.monthMap().get(entry2.getKey()));
            }
          } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
          }
        }
      });

      // cel style content
      CellStyle contentCellStyle = workbook.createCellStyle();
      contentCellStyle.setAlignment(HorizontalAlignment.CENTER);
      contentCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
      contentCellStyle.setBorderTop(BorderStyle.THIN);
      contentCellStyle.setBorderBottom(BorderStyle.THIN);
      contentCellStyle.setBorderLeft(BorderStyle.THIN);
      contentCellStyle.setBorderRight(BorderStyle.THIN);

      DataFormat format = workbook.createDataFormat();
      contentCellStyle.setDataFormat(format.getFormat("#,###"));

      // Tự động điều chỉnh độ rộng của cột
      sheet.autoSizeColumn(2);

      // Duyệt qua danh sách số tiền (revenue) và ghi dữ liệu vào tệp Excel
      int rowNumber = 1;
      for (Map.Entry<String, Float> entry : sortedList) {
        Row row = sheet.createRow(rowNumber++);
        row.createCell(0).setCellValue(rowNumber - 1);
        row.getCell(0).setCellStyle(contentCellStyle);
        row.createCell(1).setCellValue(entry.getKey());
        row.getCell(1).setCellStyle(contentCellStyle);
        row.createCell(2).setCellValue(entry.getValue());
        row.getCell(2).setCellStyle(contentCellStyle);
      }

      // Lưu tệp Excel vào một ByteArrayOutputStream
      try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
        workbook.write(baos);
        return baos.toByteArray();
      }
    } catch (IOException e) {
      // Xử lý lỗi nếu có
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }


}
