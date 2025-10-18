import axios from 'axios';
import type {
  Concept,
  Relationship,
  GraphData,
  CreateConceptInput,
  CreateRelationshipInput,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Concepts
export const getConcepts = async (params?: {
  type?: string;
  search?: string;
  limit?: number;
}): Promise<Concept[]> => {
  const { data } = await api.get('/concepts', { params });
  return data;
};

export const getConceptById = async (id: string): Promise<Concept> => {
  const { data } = await api.get(`/concepts/${id}`);
  return data;
};

export const createConcept = async (
  input: CreateConceptInput
): Promise<Concept> => {
  const { data } = await api.post('/concepts', input);
  return data;
};

export const updateConcept = async (
  id: string,
  input: Partial<CreateConceptInput>
): Promise<Concept> => {
  const { data } = await api.patch(`/concepts/${id}`, input);
  return data;
};

export const deleteConcept = async (id: string): Promise<void> => {
  await api.delete(`/concepts/${id}`);
};

// Relationships
export const getRelationships = async (params?: {
  sourceConceptId?: string;
  targetConceptId?: string;
  relationshipType?: string;
}): Promise<Relationship[]> => {
  const { data } = await api.get('/relationships', { params });
  return data;
};

export const createRelationship = async (
  input: CreateRelationshipInput
): Promise<Relationship> => {
  const { data } = await api.post('/relationships', input);
  return data;
};

export const deleteRelationship = async (id: string): Promise<void> => {
  await api.delete(`/relationships/${id}`);
};

// Graph
export const getGraph = async (params?: {
  startConceptId?: string;
  depth?: number;
}): Promise<GraphData> => {
  const { data } = await api.get('/graph', { params });
  return data;
};

export const getGraphStats = async (): Promise<{
  concepts: number;
  relationships: number;
  typeDistribution: Array<{ type: string; _count: number }>;
}> => {
  const { data } = await api.get('/graph/stats');
  return data;
};
