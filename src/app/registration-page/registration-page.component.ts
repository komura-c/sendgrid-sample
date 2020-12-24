import { Component, OnInit } from '@angular/core';
import { TemplateMailData } from 'functions/src/interfaces/send-mail';
import { SendMailService } from '../services/send-mail.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  constructor(private sendMailService: SendMailService) {}

  ngOnInit(): void {}

  sendMail() {
    const sendData: Omit<TemplateMailData, 'to' | 'from'> = {
      templateId: 'd-690ba7bafb8e4785bcc157db601eecb2',
      dynamicTemplateData: {
        name: 'komura-c',
      },
    };
    this.sendMailService.sendMailTrigger(sendData);
  }
}
