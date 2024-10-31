import sgMail from '@sendgrid/mail';
import "dotenv/config";

const { SENDGRID_MAIL_FROM, SENDGRID_AI_KEY } = process.env;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = data => {
    const msg = { ...data, from: SENDGRID_MAIL_FROM };
    return sgMail.send(msg);
};

export default sendEmail;
