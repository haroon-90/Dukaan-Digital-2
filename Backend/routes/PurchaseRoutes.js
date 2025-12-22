import express from "express";
import Auth from "../middlewares/Auth.js";
import {addPurchase, getPurchase, deletePurchase} from "../controllers/purchaseControllers.js"

const router = express.Router();

router.post('/', Auth, addPurchase);
router.post('/all', Auth, getPurchase);
router.delete('/:id', Auth, deletePurchase);
// // router.get('/:id', Auth, getSingleSale);

export default router;