/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/database/user.schema";
import bcrypt from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //Step 3
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
      });
    }

    // Step 1
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
    // step 2
    const mailOptions = {
      from: "mahfujurrheeck@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>
      Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password"
      }
      or copy and paste the link below in your browser.
      <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`, // HTML version of the message
    };
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (error: any | unknown) {
    throw new Error(error);
  }
};
