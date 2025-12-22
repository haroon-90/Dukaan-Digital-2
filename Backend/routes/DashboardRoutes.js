import express from "express";
import Auth from "../middlewares/Auth.js";
import { getDashboard } from '../controllers/dahboardController.js';

const router = express.Router();

router.get('/', Auth, getDashboard);

export default router;