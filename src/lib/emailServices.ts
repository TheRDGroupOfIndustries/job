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

export const sendRejectionMail = async (application: any) => {
  const { appliedBy } = application;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #d9534f;">Job Application Update</h2>
      <p>Dear <strong>${appliedBy.name}</strong>,</p>
      <p>Thank you for applying to our job opening. We truly appreciate the time and effort you put into your application.</p>
      <p>After careful consideration, we regret to inform you that your application has not been selected for further process at this time.</p>
      <p>We encourage you to apply for future opportunities that match your skills and experience.</p>
      <br/>
      <p style="margin-top:20px;">Best regards,</p>
      <p><strong>Job App Team</strong></p>
    </div>
  `;

  return sendEmail({
    to: appliedBy.email,
    subject: "Application Status - Rejected",
    text: `Dear ${appliedBy.name}, we regret to inform you that your job application has been rejected. Thank you for applying, and we encourage you to apply again in the future.`,
    html,
  });
};


export const sendApproveMail = async (application: any) => {
  const { appliedBy } = application;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #28a745;">Congratulations!</h2>
      <p>Dear <strong>${appliedBy.name}</strong>,</p>
      <p>We are pleased to inform you that your job application has been <strong>approved</strong>.</p>
      <p>Our team was impressed with your skills and experience, and we look forward to moving ahead with the next steps of the hiring process.</p>
      <p>Our HR team will contact you soon with further details.</p>
      <br/>
      <p style="margin-top:20px;">Best regards,</p>
      <p><strong>Job App Team</strong></p>
    </div>
  `;

  return sendEmail({
    to: appliedBy.email,
    subject: "Application Status - Approved 🎉",
    text: `Dear ${appliedBy.name}, congratulations! Your job application has been approved. Our HR team will contact you soon with further details.`,
    html,
  });
};

