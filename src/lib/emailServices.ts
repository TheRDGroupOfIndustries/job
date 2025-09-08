import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const mailOptions = {
      from: `JOB APP <${process.env.EMAIL_USER}>`,
      ...options,
    };
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

const otpTemplate = `
  <div>
  <h2>Job App - {{TYPE}}</h2>
  <p>Hello,</p>
  <p>Your OTP code is:</p>
  <p>
    {{CODE}}
  </p>
  <p>This code will expire in {{TIME}} minutes.</p>
  <p>If you didn't request this, please ignore this email.</p>
</div>
`;

function fillTemplate(template: string, data: Record<string, string>) {
  let filled = template;
  for (const key in data) {
    const regex = new RegExp(`{{${key}}}`, "gi");
    filled = filled.replace(regex, data[key]);
  }
  return filled;
}

export const sendOTP = async (to: string, otp: string, type: "Register") => {
  const html = fillTemplate(otpTemplate, {
    CODE: otp,
    TYPE: type,
    TIME: "10",
  });

  return sendEmail({
    to,
    subject: `Your OTP for ${type}`,
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    html,
  });
};
