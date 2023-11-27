package obtbms.job;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import obtbms.constant.EmailConstant;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

public class SendMailJob extends Thread {
  private String from;
  private String toEmail;
  private String subject;
  private String htmlBody;
  private JavaMailSender javaMailSender;

  public SendMailJob(String from, String toEmail, String subject, String htmlBody, JavaMailSender javaMailSender) {
    this.from = from;
    this.toEmail = toEmail;
    this.subject = subject;
    this.htmlBody = htmlBody;
    this.javaMailSender = javaMailSender;
  }

  @Override
  public void run() {
    try {
      MimeMessage mimeMessage = javaMailSender.createMimeMessage();
      MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, EmailConstant.UTF_8);
      mimeMessageHelper.setFrom(from);
      mimeMessageHelper.setTo(toEmail);
      mimeMessageHelper.setSubject(subject);
      mimeMessageHelper.setText(htmlBody, true);
      javaMailSender.send(mimeMessage);
    } catch (MessagingException e) {
      throw new RuntimeException(e);
    }
  }

}
