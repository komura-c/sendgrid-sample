import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';
import { SendGridMailData, TemplateMailData } from './interfaces/send-mail';

// 環境変数からキーを取得
const env = functions.config();
const API_KEY = env.send_grid.api_key;

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
        to: env.to_email,
        from: {
          email: env.from_email,
          name: env.from_name,
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
