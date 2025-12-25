import express from "express";
import Auth from "../middlewares/Auth.js";
import { addUdhaar, getUdhaarList, getUdhaarById, updateUdhaar, deleteUdhaar } from '../controllers/udhaarControllers.js';

const router = express.Router();

router.post('/', Auth, addUdhaar);
router.get('/', Auth, getUdhaarList);
router.get('/:id', Auth, getUdhaarById);
router.put('/:id', Auth, updateUdhaar);
router.delete('/:id', Auth, deleteUdhaar);

export default router;