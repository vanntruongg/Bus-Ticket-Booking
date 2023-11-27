package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.common.ResponseObject;
import obtbms.constant.MessageConstant;
import obtbms.service.StatisticalService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static obtbms.constant.ApiEndpoint.*;

@RestController
@RequestMapping(BASE_API)
@RequiredArgsConstructor
public class StatisticalController {

  private final StatisticalService statisticalService;

  @GetMapping(STATISTIC_REVENUE_YEARLY)
  public ResponseEntity<ResponseObject<Object>> yearlyRevenue() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.yearlyRevenue())
            .build());
  }

  @GetMapping(STATISTIC_REVENUE_QUARTERLY)
  public ResponseEntity<ResponseObject<Object>> quarterlyRevenue() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.quarterlyRevenue())
            .build());
  }

  @GetMapping(STATISTIC_REVENUE_MONTHLY)
  public ResponseEntity<ResponseObject<Object>> monthlyRevenue(@RequestParam("month") int month) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(statisticalService.monthlyRevenue(month))
            .build());
  }

  @GetMapping(STATISTIC_REVENUE_WEEKLY)
  public ResponseEntity<ResponseObject<Object>> weeklyRevenue(@RequestParam("month") int month, @RequestParam("week") int week) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.weeklyRevenue(month, week))
            .build());
  }

  @GetMapping(STATISTIC_REVENUE_THIS_WEEK)
  public ResponseEntity<ResponseObject<Object>> getRevenueThisWeek() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.getRevenueThisWeek())
            .build());
  }

  @GetMapping(STATISTIC_TICK_SOLD_THIS_WEEK)
  public ResponseEntity<ResponseObject<Object>> getTotalTicketsSoldThisWeek() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.getTotalTicketsSoldThisWeek())
            .build());
  }

  @GetMapping(STATISTIC_TICK_COUNT_TODAY)
  public ResponseEntity<ResponseObject<Object>> getTotalTicketUsedToday() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .isSuccess(true)
                    .message(MessageConstant.FIND_SUCCESS)
                    .data(statisticalService.getTotalTicketUsedToday())
            .build());
  }

  @GetMapping(STATISTIC_TICK_COUNT_BOOKING_TODAY)
  public ResponseEntity<ResponseObject<Object>> getTotalTicketBookingToday() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.getTotalTicketBookingToday())
            .build());
  }

  @GetMapping(STATISTIC_USER_COUNT)
  public ResponseEntity<ResponseObject<Object>> countTotalUsers() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
            .isSuccess(true)
            .message(MessageConstant.FIND_SUCCESS)
            .data(statisticalService.countTotalUsers())
            .build());
  }

//  @GetMapping(STATISTIC_GET_REPORT_QUARTER)
//  public  ResponseEntity<ResponseObject<Object>> getRevenueReportInQuarter(@RequestParam("quarter") int quarter) {
//    HttpHeaders headers = new HttpHeaders();
//    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//    headers.setContentDispositionFormData("attachment", "revenue_report_quarter.xlsx");
//    return ResponseEntity.status(HttpStatus.OK).headers(headers).body(ResponseObject.builder()
//                    .isSuccess(true)
//                    .message(MessageConstant.SUCCESSFULLY)
//                    .data(statisticalService.getRevenueReportInQuarter(quarter))
//            .build());
//  }

//  @GetMapping(STATISTIC_GET_REPORT_MONTH)
//  public  ResponseEntity<ResponseObject<Object>> getRevenueReportInMonth(@RequestParam("month") int month) {
//    HttpHeaders headers = new HttpHeaders();
//    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//    headers.setContentDispositionFormData("attachment", "revenue_report_month.xlsx");
//    return ResponseEntity.status(HttpStatus.OK).headers(headers).body(ResponseObject.builder()
//            .isSuccess(true)
//            .message(MessageConstant.SUCCESSFULLY)
//            .data(statisticalService.getRevenueReportInMonth(month))
//            .build());
//  }

  @GetMapping(EXPORT_REVENUE_REPORT_YEAR)
  public ResponseEntity<byte[]> getRevenueReportByYear() {
    // Tạo tệp Excel và lưu nó vào một byte array
    byte[] excelData = statisticalService.getRevenueReportByYear();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", "revenue_report_year.xlsx");

    return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
  }

  @GetMapping(EXPORT_REVENUE_REPORT_QUARTER)
  public ResponseEntity<byte[]> getRevenueReportByQuarter() {
    // Tạo tệp Excel và lưu nó vào một byte array
    byte[] excelData = statisticalService.getRevenueReportByQuarter();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", "revenue_report_quarter.xlsx");

    return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
  }

  @GetMapping(EXPORT_REVENUE_REPORT_MONTH)
  public ResponseEntity<byte[]> getRevenueReportByMonth(@RequestParam("month") int month) {
    // Tạo tệp Excel và lưu nó vào một byte array
    byte[] excelData = statisticalService.getRevenueReportByMonth(month);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", "revenue_report_month.xlsx");

    return new ResponseEntity<>(excelData, headers, HttpStatus.OK);
  }


}
