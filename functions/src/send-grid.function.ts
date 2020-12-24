import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';
import { SendGridMailData, TemplateMailData } from './interfaces/send-mail';

// 環境変数からキーを取得
const sendGridEnv = functions.config().send_grid;
const API_KEY = sendGridEnv.api_key;

// メールクライアント初期化
sgMail.setApiKey(API_KEY);

export const sendMailBySendGrid = functions
  .region('asia-northeast1')
  .https.onCall(
    async (
      data: Omit<TemplateMailData, 'to' | 'from'>,
      context
    ): Promise<string> => {
      const sendData: SendGridMailData = {
        ...data,
        to: sendGridEnv.to_email,
        from: {
          email: sendGridEnv.from_email,
          name: sendGridEnv.from_name,
        },
      };
      return await sgMail.send(sendData).then(
        () => {
          const msg = 'Email sent';
          console.info(msg);
          return msg;
        },
        (error) => {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
          throw error;
        }
      );
    }
  );
