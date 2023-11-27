package obtbms.service.impl;

import jakarta.mail.*;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import obtbms.constant.EmailConstant;
import obtbms.entity.Ticket;
import obtbms.entity.User;
import obtbms.entity.dto.FeedbackRequest;
import obtbms.job.SendMailJob;
import obtbms.service.MailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import static obtbms.constant.EmailConstant.*;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {
  private final JavaMailSender javaMailSender;
  private final TemplateEngine templateEngine;

  @Value("${spring.mail.username}")
  private String systemEmail;

  @Override
  public void sendMail(List<Ticket> tickets) {
    Context context = new Context();
    Map<String, Object> templateModel = new HashMap<>();
    templateModel.put("tickets", tickets);

    context.setVariables(templateModel);
    String htmlBody = templateEngine.process(CLASSPATH_INFO_TICKET, context);
    String subject = "Ticket booking information";
    jobSendEmail(systemEmail, tickets.get(0).getUser().getEmail(), subject, htmlBody);
  }

  @Override
  public void sendMail(User user, String url) {
    Context context = new Context();
    Map<String, Object> templateModel = new HashMap<>();
    templateModel.put("name", user.getFirstName());
    templateModel.put("fromName", EmailConstant.VT_BUS_TICKET_BOOKING);
    templateModel.put("url", url);
    context.setVariables(templateModel);
    String htmlBody = templateEngine.process(CLASSPATH_RESET_PASSWORD, context);
    String subject = RESET_PASSWORD_SUBJECT;
    jobSendEmail(systemEmail, user.getEmail(), subject, htmlBody);
  }

  @Override
  public void sendMail(String email, String password) {
    Context context = new Context();
    Map<String, Object> templateModel = new HashMap<>();
    templateModel.put("email", email);
    templateModel.put("password", password);

    context.setVariables(templateModel);
    String htmlBody = templateEngine.process(CLASSPATH_CREATE_ACCOUNT, context);
    String subject = "Tạo tài khoản mới";
    jobSendEmail(systemEmail, email, subject, htmlBody);
  }


  private void jobSendEmail(String from, String to, String subject, String htmlBody) {
    Thread job = new SendMailJob(from, to, subject, htmlBody, javaMailSender);
    job.start();
  }
}
