package obtbms.config;


import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@RequiredArgsConstructor
public class MailConfig {

  private final MailProperties mailProperties;

  @Bean
  public JavaMailSender javaMailSender() {
    JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
    javaMailSender.setHost(mailProperties.getHost());
    javaMailSender.setPort(mailProperties.getPort());
    javaMailSender.setUsername(mailProperties.getUsername());
    javaMailSender.setPassword(mailProperties.getPassword());

    Properties props = javaMailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.debug", "true");

    return javaMailSender;
  }
}
