import { User } from "./../entities/user.entity";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { logger } from "./logger";
import { DeepPartial } from "typeorm";

config();

type SendEmailProps = {
  user: DeepPartial<User>;
  subject: string;
  token: string;
};

// !FIX: function have to much things to do
export async function sendMail({ user, subject, token }: SendEmailProps) {
  const customerPortal = "IPB Kehilangan";
  const changePasswordUrl = `http://localhost:3000/api/users/change-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.USER_MAIL, // generated ethereal user
      pass: process.env.PASSWORD_MAIL, // generated ethereal password
    },
  });

  const info = await transporter.sendMail({
    from: '"IPB Kehilangan" <ipb-kehilangan@gmail.com>',
    to: user.email,
    subject,
    html: `
    <p>
      Hi ${user.name},<br><br>
      You recently requested to reset the password for your ${customerPortal} account.<br> Click the button below to proceed.<br><br>
      
      <a href="${changePasswordUrl}">
        <button type="button">Reset password</button>
      </a><br><br>

      Or copy and paste the URL into your browser:<br>
      <a href="${changePasswordUrl}">${changePasswordUrl}</a><br><br>
      
      If you did not request a password reset, please ignore this email or reply to let us know. This password reset link is only valid for the next 30 minutes.<br>
      
      Thanks, the ${customerPortal} team<br>
    </p>
    `,
  });

  logger.info("Mail message sent: %s", info.messageId);
  logger.info("Preview Mail URL: %s", nodemailer.getTestMessageUrl(info));
}
