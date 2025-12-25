import User from "../models/User.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

// Nodemailer transporter (Sendinblue)
const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const requestReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
        await user.save();

        await transporter.sendMail({
            from: `"Dukaan Digital" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "OTP for Password Reset",
            text: `Your OTP is ${otp}. It expires in 10 minutes.`,
        });

        res.json({ message: "OTP sent to your email" });
    } catch (err) {
        console.error("❌ OTP not sent:", err);
        res.status(500).json({ message: "Error sending OTP" });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.otp !== otp || user.otpExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.json({ message: "OTP verified" });
    } catch (err) {
        res.status(500).json({ message: "Error verifying OTP" });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.json({ message: "Password successfully reset" });
    } catch (err) {
        res.status(500).json({ message: "Error resetting password" });
    }
};
