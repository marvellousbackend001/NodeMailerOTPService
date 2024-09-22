require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});
const sendEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"WorkWave" <${process.env.EMAIL_USER}>`, 
            to: email,
            subject: 'Your OTP Code',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
              <h2 style="color: #4CAF50; text-align: center;">Your OTP for Email Verification 💌</h2>
              <p style="color: #333;">Dear ${email},</p>
              <p style="color: #333;">The One Time Password (OTP) for email verification is:</p>
              <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #ff5722;">${otp}</span>
              </div>
              <p style="color: #333;">
                This OTP is valid for <strong>5 minutes</strong> or <strong>1 successful attempt</strong>, whichever is earlier. Please do not share this OTP with anyone.
              </p>
              <p style="color: #333; text-align: center;">
                Thank YOU ❤️
              </p>
              <hr style="border: 1px solid #eaeaea; margin: 20px 0;">
            </div>
          `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Failed to send email' };
    }
};


module.exports = { sendEmail };
