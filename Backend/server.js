import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";

import AuthRoutes from './routes/authRoutes.js'
import ProfileRoutes from './routes/profileRoute.js'
import ProductRoutes from './routes/ProductRoutes.js'
import SalesRoutes from './routes/SalesRoutes.js'
import PurchaseRoutes from './routes/PurchaseRoutes.js'
import UdhaarRoutes from './routes/UdhaarRoutes.js'
import ExpenseRoutes from './routes/ExpenseRoutes.js'
import ReportRoutes from './routes/ReportRoutes.js'
import Dashboard from './routes/DashboardRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'
import OTPRoutes from './routes/otpRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['https://haroon-90.github.io', 'http://localhost:5173', 'https://dukaan-digital.vercel.app'],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.get("/", (_, res) => {
  res.send("Welcome to server");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/sales", SalesRoutes);
app.use("/api/purchase", PurchaseRoutes);
app.use("/api/udhaar", UdhaarRoutes);
app.use("/api/expense", ExpenseRoutes);
app.use("/api/report", ReportRoutes);
app.use("/api/dashboard", Dashboard);
app.use("/api/admin", AdminRoutes);
app.use("/api/otp", OTPRoutes);

app.get("/test-env", (req, res) => {
  res.json({
    mongo: process.env.MONGODB_URL ? "found" : "missing",
    jwt: process.env.SECRET_KEY ? "found" : "missing"
  });
});

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("Error connecting with MongoDB"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
