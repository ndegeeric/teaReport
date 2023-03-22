import express from 'express';
import { getPicked, createPicked, getOnePick, updatePick, deletePick } from '../controllers/picking.js'

const router = express.Router();

router.get('/:id', getOnePick);
router.get('/', getPicked);
router.post('/', createPicked);
router.patch('/:id', updatePick);
router.delete('/:id', deletePick);

export default router;