export interface Concept {
  id: string;
  title: string;
  description?: string;
  type: 'idea' | 'theory' | 'question' | 'quote' | 'term' | 'other';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Relationship {
  id: string;
  sourceConceptId: string;
  targetConceptId: string;
  relationshipType: RelationshipType;
  description?: string;
  createdBy: string;
  createdAt: string;
  sourceConcept?: Concept;
  targetConcept?: Concept;
}

export type RelationshipType =
  | 'influences'
  | 'contradicts'
  | 'evolves_from'
  | 'example_of'
  | 'related_to'
  | 'supports'
  | 'opposes'
  | 'explains'
  | 'questions'
  | 'extends';

export interface GraphNode {
  id: string;
  type: string;
  data: {
    label: string;
    description?: string;
    type: string;
    createdBy: string;
  };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  label: string;
  data: {
    relationshipType: string;
    description?: string;
    createdBy: string;
  };
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface CreateConceptInput {
  title: string;
  description?: string;
  type?: Concept['type'];
  createdBy?: string;
}

export interface CreateRelationshipInput {
  sourceConceptId: string;
  targetConceptId: string;
  relationshipType: RelationshipType;
  description?: string;
  createdBy?: string;
}
