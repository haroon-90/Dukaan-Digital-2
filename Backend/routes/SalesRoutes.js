import express from "express";
import Auth from "../middlewares/Auth.js";
import {
    createSale,
    getSales,
    // getSingleSale,
    deleteSale
} from '../controllers/salesControllers.js';

const router = express.Router();

router.post('/', Auth, createSale);
router.post('/all', Auth, getSales);
// router.get('/:id', Auth, getSingleSale);
router.delete('/:id', Auth, deleteSale);

export default router;