import { Router } from 'express';
import {
  getAllRelationships,
  getRelationshipById,
  createRelationship,
  deleteRelationship,
} from '../controllers/relationships.js';
import { validate } from '../middleware/validation.js';
import { createRelationshipSchema } from '../types/index.js';

const router = Router();

router.get('/', getAllRelationships);
router.get('/:id', getRelationshipById);
router.post('/', validate(createRelationshipSchema), createRelationship);
router.delete('/:id', deleteRelationship);

export default router;
