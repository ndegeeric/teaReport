import express from 'express';
import { getPicked, createPicked, getOnePick, updatePick, deletePick, monthlyTotals } from '../controllers/picking.js'

const router = express.Router();

router.get('/:id', getOnePick);
router.get('/', getPicked);
router.post('/', createPicked);
router.patch('/:id', updatePick);
router.delete('/:id', deletePick);
router.post('/mt', monthlyTotals)

export default router;