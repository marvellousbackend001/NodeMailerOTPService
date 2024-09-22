const express = require('express');
const nodemailer = require('nodemailer');
const { sendEmail } = require('../service/emailService');
const router = express.Router();
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

const sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = generateOtp();
    // Store OTP in cookies (valid for 5 minutes)
    res.cookie('otp', otp, { maxAge: 5 * 60 * 1000, httpOnly: true });

    try {
        await sendEmail(email, otp);
        res.status(200).json({ message: `OTP sent to ${email}` });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
};

const verifyOtp = (req, res) => {
    const { otp: storedOtp } = req.cookies || {};

    if (!storedOtp) {
        return res.status(400).json({ error: "OTP not found in cookies." });
    }

    const { otp } = req.body;

    if (otp === storedOtp) {
        return res.status(200).json({ message: "OTP verified successfully." });
    } else {
        return res.status(400).json({ error: "Invalid OTP." });
    }
};

module.exports = { sendOtp, verifyOtp };

