

import nodemailer from "nodemailer";

export async function sendEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER, // your email address
      pass: process.env.MAIL_PASS  // app password
    }
  });

  const mailOptions = {
    from: '"Pizza App" <pizza@app.com>',
    to: email,
    subject: "Email Verification",
    html: `<a href="http://localhost:5000/api/auth/verify-email?token=${token}">Click to verify your email</a>`
  };

  await transporter.sendMail(mailOptions);
}
