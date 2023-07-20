import express from 'express';
import { monthlyTotals, groupByMonth } from '../controllers/picking.js';

const router = express.Router();

router.post('/monthlyPicks', monthlyTotals);
router.get('/groupByMonth', groupByMonth);
// router.get('/annualPicks', lastOneYear);
// router.get('/monthlyExpenses', getMonthlyExpense);
// router.get('/annualExpenses', getAnnualExpenses);

export default router;