import * as functions from 'firebase-functions';
import * as sgMail from '@sendgrid/mail';
import { SendGridMailData } from './interfaces/send-mail';

// 環境変数からキーを取得
const API_KEY = functions.config().send_grid.api_key;

// メールクライアント初期化
sgMail.setApiKey(API_KEY);

export const sendMailBySendGrid = functions
  .region('asia-northeast1')
  .https.onCall(
    async (data: SendGridMailData, context): Promise<string> => {
      return await sendEmail(data).then(
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

const sendEmail = (data: SendGridMailData) => {
  return sgMail.send(data);
};
