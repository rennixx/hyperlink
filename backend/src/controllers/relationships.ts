import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { CreateRelationshipInput } from '../types/index.js';

const prisma = new PrismaClient();

export const getAllRelationships = async (req: Request, res: Response) => {
  try {
    const { sourceConceptId, targetConceptId, relationshipType } = req.query;

    const where: any = {};
    if (sourceConceptId) where.sourceConceptId = sourceConceptId;
    if (targetConceptId) where.targetConceptId = targetConceptId;
    if (relationshipType) where.relationshipType = relationshipType;

    const relationships = await prisma.relationship.findMany({
      where,
      include: {
        sourceConcept: true,
        targetConcept: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(relationships);
  } catch (error) {
    console.error('Error fetching relationships:', error);
    res.status(500).json({ error: 'Failed to fetch relationships' });
  }
};

export const getRelationshipById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const relationship = await prisma.relationship.findUnique({
      where: { id },
      include: {
        sourceConcept: true,
        targetConcept: true,
      },
    });

    if (!relationship) {
      return res.status(404).json({ error: 'Relationship not found' });
    }

    res.json(relationship);
  } catch (error) {
    console.error('Error fetching relationship:', error);
    res.status(500).json({ error: 'Failed to fetch relationship' });
  }
};

export const createRelationship = async (req: Request, res: Response) => {
  try {
    const data: CreateRelationshipInput = req.body;

    // Check if concepts exist
    const [sourceConcept, targetConcept] = await Promise.all([
      prisma.concept.findUnique({ where: { id: data.sourceConceptId } }),
      prisma.concept.findUnique({ where: { id: data.targetConceptId } }),
    ]);

    if (!sourceConcept || !targetConcept) {
      return res.status(404).json({ error: 'One or both concepts not found' });
    }

    // Security check: User can only link concepts they created
    // At least one of the concepts must be owned by the user
    const createdBy = data.createdBy || 'anonymous';
    const ownsSource = sourceConcept.createdBy === createdBy;
    const ownsTarget = targetConcept.createdBy === createdBy;

    if (!ownsSource && !ownsTarget && createdBy !== 'anonymous') {
      return res.status(403).json({
        error: 'You can only create relationships for concepts you own',
        details: 'At least one of the concepts must be created by you'
      });
    }

    const relationship = await prisma.relationship.create({
      data,
      include: {
        sourceConcept: true,
        targetConcept: true,
      },
    });

    res.status(201).json(relationship);
  } catch (error) {
    console.error('Error creating relationship:', error);
    res.status(500).json({ error: 'Failed to create relationship' });
  }
};

export const deleteRelationship = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.relationship.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting relationship:', error);
    res.status(500).json({ error: 'Failed to delete relationship' });
  }
};
