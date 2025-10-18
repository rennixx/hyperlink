import { z } from 'zod';

// Concept validation schemas
export const createConceptSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  type: z.enum(['idea', 'theory', 'question', 'quote', 'term', 'other']).default('idea'),
  createdBy: z.string().max(100).default('anonymous'),
});

export const updateConceptSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  type: z.enum(['idea', 'theory', 'question', 'quote', 'term', 'other']).optional(),
});

// Relationship validation schemas
export const createRelationshipSchema = z.object({
  sourceConceptId: z.string().uuid(),
  targetConceptId: z.string().uuid(),
  relationshipType: z.enum([
    'influences',
    'contradicts',
    'evolves_from',
    'example_of',
    'related_to',
    'supports',
    'opposes',
    'explains',
    'questions',
    'extends'
  ]),
  description: z.string().optional(),
  createdBy: z.string().max(100).default('anonymous'),
});

export type CreateConceptInput = z.infer<typeof createConceptSchema>;
export type UpdateConceptInput = z.infer<typeof updateConceptSchema>;
export type CreateRelationshipInput = z.infer<typeof createRelationshipSchema>;
