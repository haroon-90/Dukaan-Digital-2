import express from "express";
import Auth from "../middlewares/Auth.js";
import { getReport } from '../controllers/reportControllers.js';

const router = express.Router();

router.post('/', Auth, getReport);
// router.get('/monthly', Auth, getMonthlyReport);

export default router;