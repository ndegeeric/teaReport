import express from 'express';
import { getPicked, createPicked, getOnePick, updatePick, deletePick, monthlyTotals } from '../controllers/picking.js'
import { deleteValidation } from '../middleware/deleteValidation.js';

const router = express.Router();

router.get('/:id', getOnePick);
router.get('/', getPicked);
router.post('/monTtl', monthlyTotals);
router.post('/', createPicked);
router.patch('/:id', updatePick);
router.delete('/:id', deleteValidation, deletePick);

export default router;