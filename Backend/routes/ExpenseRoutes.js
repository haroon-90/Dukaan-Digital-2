import express from "express";
import Auth from "../middlewares/Auth.js";
import { addExpense, getExpenses, deleteExpense } from '../controllers/expenseControllers.js';

const router = express.Router();

router.post('/', Auth, addExpense);
router.get('/', Auth, getExpenses);
router.delete('/:id', Auth, deleteExpense);

export default router;