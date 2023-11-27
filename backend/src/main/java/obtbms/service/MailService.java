package obtbms.service;

import obtbms.entity.Ticket;
import obtbms.entity.User;
import obtbms.entity.dto.FeedbackRequest;

import java.util.List;

public interface MailService {
  void sendMail(List<Ticket> ticket);
  void sendMail(User user, String url);
  void sendMail(String email, String password);
//  void sendMail(String toEmail, String subject, String body, String templateName);
}
