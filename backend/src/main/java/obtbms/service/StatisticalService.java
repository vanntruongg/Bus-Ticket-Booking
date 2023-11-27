package obtbms.service;

import obtbms.entity.dto.RevenueResponse;

import java.util.List;

public interface StatisticalService {
  List<RevenueResponse> yearlyRevenue();
  List<RevenueResponse> quarterlyRevenue();
  List<RevenueResponse> monthlyRevenue(int month);
  List<RevenueResponse> weeklyRevenue(int month, int week);
  List<RevenueResponse> getRevenueThisWeek();
  Integer getTotalTicketUsedToday();
  Integer getTotalTicketBookingToday();
  int countTotalUsers();
  List<RevenueResponse> getTotalTicketsSoldThisWeek();

//  byte[] getRevenueReportInQuarter(int quarter);

//  byte[] getRevenueReportInMonth(int month);

  byte[] getRevenueReportByYear();

  byte[] getRevenueReportByQuarter();

  byte[] getRevenueReportByMonth(int month);
}
