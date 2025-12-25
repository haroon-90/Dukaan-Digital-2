import express from "express";
import { requestReset, verifyOTP, resetPassword } from "../controllers/otpController.js";

const router = express.Router();

router.post("/request-reset", requestReset);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;