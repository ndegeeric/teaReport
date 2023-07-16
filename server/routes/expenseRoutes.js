import express from 'express';
import { getExpenses,getOneExpense, createExpense, updateExpense, deleteExpense  } from '../controllers/picking.js';

const router = express.Router();

router.get('/:id', getOneExpense);
router.get('/', getExpenses);
router.post('/', createExpense);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;