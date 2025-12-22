import express from "express";
import Auth from "../middlewares/Auth.js";
import { GetProfile, getAllUsers, updateProfile, deleteUser } from "../controllers/profileControllers.js";

const router = express.Router();

router.get('/', Auth, GetProfile)
router.get('/allusers', Auth, getAllUsers)
router.put('/update', Auth, updateProfile)
router.delete('/delete', Auth, deleteUser)

export default router