import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import type { CreateConceptInput, UpdateConceptInput } from '../types/index.js';

const prisma = new PrismaClient();

export const getAllConcepts = async (req: Request, res: Response) => {
  try {
    const { type, search, limit = '50' } = req.query;

    const where: any = {};
    if (type) where.type = type;
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { description: { contains: search as string } },
      ];
    }

    const concepts = await prisma.concept.findMany({
      where,
      take: parseInt(limit as string),
      orderBy: { createdAt: 'desc' },
    });

    res.json(concepts);
  } catch (error) {
    console.error('Error fetching concepts:', error);
    res.status(500).json({ error: 'Failed to fetch concepts' });
  }
};

export const getConceptById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const concept = await prisma.concept.findUnique({
      where: { id },
      include: {
        outgoingRelationships: {
          include: { targetConcept: true },
        },
        incomingRelationships: {
          include: { sourceConcept: true },
        },
      },
    });

    if (!concept) {
      return res.status(404).json({ error: 'Concept not found' });
    }

    res.json(concept);
  } catch (error) {
    console.error('Error fetching concept:', error);
    res.status(500).json({ error: 'Failed to fetch concept' });
  }
};

export const createConcept = async (req: Request, res: Response) => {
  try {
    const data: CreateConceptInput = req.body;

    const concept = await prisma.concept.create({
      data,
    });

    res.status(201).json(concept);
  } catch (error) {
    console.error('Error creating concept:', error);
    res.status(500).json({ error: 'Failed to create concept' });
  }
};

export const updateConcept = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: UpdateConceptInput = req.body;

    const concept = await prisma.concept.update({
      where: { id },
      data,
    });

    res.json(concept);
  } catch (error) {
    console.error('Error updating concept:', error);
    res.status(500).json({ error: 'Failed to update concept' });
  }
};

export const deleteConcept = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.concept.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting concept:', error);
    res.status(500).json({ error: 'Failed to delete concept' });
  }
};
