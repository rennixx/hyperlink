import { Router } from 'express';
import {
  getAllConcepts,
  getConceptById,
  createConcept,
  updateConcept,
  deleteConcept,
} from '../controllers/concepts.js';
import { validate } from '../middleware/validation.js';
import { createConceptSchema, updateConceptSchema } from '../types/index.js';

const router = Router();

router.get('/', getAllConcepts);
router.get('/:id', getConceptById);
router.post('/', validate(createConceptSchema), createConcept);
router.patch('/:id', validate(updateConceptSchema), updateConcept);
router.delete('/:id', deleteConcept);

export default router;
