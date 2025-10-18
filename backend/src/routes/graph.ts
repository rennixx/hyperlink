import { Router } from 'express';
import { getGraph, getGraphStats } from '../controllers/graph.js';

const router = Router();

router.get('/', getGraph);
router.get('/stats', getGraphStats);

export default router;
