package obtbms.controller;

import lombok.RequiredArgsConstructor;
import obtbms.entity.Ticket;
import obtbms.service.MailService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

//@RestController
@RequestMapping("/obtbms")
@RequiredArgsConstructor
@Controller
public class TestSendMailController {

  private final MailService mailService;

//  @PostMapping("/send-mail")
//  public Boolean sendMail(@RequestBody Ticket ticket) {
//      mailService.sendMail(ticket);
//      return true;
//  }
//
//  @GetMapping ("/index")
//  private String index() {
//    return "emails/info_ticket";
//  }

}
