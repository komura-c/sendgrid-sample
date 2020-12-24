type EmailData =
  | string
  | {
      name?: string | undefined;
      email: string;
    };

interface BaseMailData {
  to: EmailData | EmailData[]; // 送信先メールアドレス
  cc?: EmailData | EmailData[]; // ccメールアドレス
  bcc?: EmailData | EmailData[]; // bccメールアドレス

  from: EmailData; // 送信元メールアドレス
  replyTo?: EmailData; // 返信先メールアドレス

  sendAt?: number; // 予約送信のための時間設定（最大で72時間前）
}

export interface StandardMailData extends BaseMailData {
  subject?: string; // メール件名（テンプレートを使わない場合、あるいは保険的に記入）
  text: string; // メール本文（テンプレートを使わない場合、あるいは保険的に記入）
}

export interface HTMLMailData extends BaseMailData {
  subject?: string; // メール件名（テンプレートを使わない場合、あるいは保険的に記入）
  html: string; // HTML形式のメール本文（テンプレートを使わない場合、あるいは保険的に記入）
}

export interface TemplateMailData extends BaseMailData {
  templateId: string; // テンプレートID（ある場合）
  dynamicTemplateData?: { [key: string]: any }; // テンプレートに埋め込む変数
}

interface MailContent {
  type: string;
  value: string;
}

type MailDataRequired =
  | StandardMailData
  | HTMLMailData
  | TemplateMailData
  | (BaseMailData & {
      content: MailContent[] & {
        0: MailContent;
      };
    });

export type SendGridMailData = MailDataRequired | MailDataRequired[];
