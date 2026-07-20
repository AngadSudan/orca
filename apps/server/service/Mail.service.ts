import nodemailer from "nodemailer";
import transporter from "../utils/transporter";
import { SEND_VERIFICATION_MAIL } from "../utils/template";
class MailService {
  transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = transporter;
  }
  async sendVerificationMail(
    email: string,
    name: string,
    otp: string,
  ): Promise<boolean> {
    const template = SEND_VERIFICATION_MAIL({ email, name, otp });

    await transporter.sendMail({
      from: `"Team Orca" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Account Verification Email",
      html: template,
    });
    return true;
  }
}
export default new MailService();
