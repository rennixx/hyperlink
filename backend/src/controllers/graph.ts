import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGraph = async (req: Request, res: Response) => {
  try {
    const { startConceptId, depth = '2' } = req.query;

    let concepts;
    let relationships;

    if (startConceptId) {
      // Get a subgraph starting from a specific concept
      // For MVP, we'll do a simple implementation
      // In production, you'd want more sophisticated graph traversal
      const maxDepth = parseInt(depth as string);

      // Get all relationships and concepts (we'll filter client-side for MVP)
      // For production, implement proper graph traversal
      relationships = await prisma.relationship.findMany({
        include: {
          sourceConcept: true,
          targetConcept: true,
        },
      });

      const conceptIds = new Set<string>();
      relationships.forEach(rel => {
        conceptIds.add(rel.sourceConceptId);
        conceptIds.add(rel.targetConceptId);
      });

      concepts = await prisma.concept.findMany({
        where: {
          id: { in: Array.from(conceptIds) },
        },
      });
    } else {
      // Get the entire graph (with reasonable limits for MVP)
      const [allConcepts, allRelationships] = await Promise.all([
        prisma.concept.findMany({
          take: 100,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.relationship.findMany({
          take: 200,
          orderBy: { createdAt: 'desc' },
        }),
      ]);

      concepts = allConcepts;
      relationships = allRelationships;
    }

    // Calculate connection counts for each concept
    const connectionCounts = new Map<string, number>();
    relationships.forEach(rel => {
      connectionCounts.set(
        rel.sourceConceptId,
        (connectionCounts.get(rel.sourceConceptId) || 0) + 1
      );
      connectionCounts.set(
        rel.targetConceptId,
        (connectionCounts.get(rel.targetConceptId) || 0) + 1
      );
    });

    // Format for React Flow
    const nodes = concepts.map(concept => ({
      id: concept.id,
      type: 'concept',
      data: {
        label: concept.title,
        description: concept.description,
        type: concept.type,
        createdBy: concept.createdBy,
        connectionCount: connectionCounts.get(concept.id) || 0,
      },
      position: { x: 0, y: 0 }, // Will be auto-layouted by React Flow
    }));

    const edges = relationships.map(rel => ({
      id: rel.id,
      source: rel.sourceConceptId,
      target: rel.targetConceptId,
      type: 'default',
      label: rel.relationshipType.replace(/_/g, ' '),
      data: {
        relationshipType: rel.relationshipType,
        description: rel.description,
        createdBy: rel.createdBy,
      },
    }));

    res.json({ nodes, edges });
  } catch (error) {
    console.error('Error fetching graph:', error);
    res.status(500).json({ error: 'Failed to fetch graph data' });
  }
};

export const getGraphStats = async (req: Request, res: Response) => {
  try {
    const [conceptCount, relationshipCount, typeDistribution] = await Promise.all([
      prisma.concept.count(),
      prisma.relationship.count(),
      prisma.concept.groupBy({
        by: ['type'],
        _count: true,
      }),
    ]);

    res.json({
      concepts: conceptCount,
      relationships: relationshipCount,
      typeDistribution,
    });
  } catch (error) {
    console.error('Error fetching graph stats:', error);
    res.status(500).json({ error: 'Failed to fetch graph stats' });
  }
};
