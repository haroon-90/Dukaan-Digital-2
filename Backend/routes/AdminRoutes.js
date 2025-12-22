import express from "express";
import { GetAdminDashboard, getAdminProfile, updateshop, editUserstatus, deleteshop } from "../controllers/adminController.js";
import Auth from "../middlewares/Auth.js";
import AdminAuth from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/", Auth, AdminAuth, GetAdminDashboard);
router.get("/profile", Auth, AdminAuth, getAdminProfile);
router.put('/:id', Auth, AdminAuth, updateshop);
router.post('/status/:id', Auth, AdminAuth, editUserstatus);
router.delete('/:id', Auth, AdminAuth, deleteshop);

export default router;