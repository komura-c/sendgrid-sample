import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { TemplateMailData } from 'functions/src/interfaces/send-mail';

@Injectable({
  providedIn: 'root',
})
export class SendMailService {
  constructor(private fns: AngularFireFunctions) {}

  sendMailTrigger(sendData: Omit<TemplateMailData, 'to' | 'from'>): void {
    const callable = this.fns.httpsCallable('sendMailBySendGrid');
    callable(sendData)
      .toPromise()
      .then((response) => {
        console.log(response);
      });
  }
}
