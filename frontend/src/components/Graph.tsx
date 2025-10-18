import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
} from '@xyflow/react';
import { getGraph } from '../lib/api';
import ConceptNode from './ConceptNode';

const nodeTypes = {
  concept: ConceptNode,
};

interface GraphProps {
  searchQuery: string;
  selectedType: string;
  onNodeClick?: (nodeId: string) => void;
  onExport?: () => void;
}

export default function Graph({ searchQuery, selectedType, onNodeClick, onExport }: GraphProps) {
  const { data: graphData, isLoading } = useQuery({
    queryKey: ['graph'],
    queryFn: () => getGraph(),
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (_event: any, node: any) => {
      if (onNodeClick) {
        onNodeClick(node.id);
      }
    },
    [onNodeClick]
  );

  // Filter nodes based on search and type
  const filteredData = useMemo(() => {
    if (!graphData) return null;

    let filteredNodes = graphData.nodes;

    // Filter by type
    if (selectedType !== 'all') {
      filteredNodes = filteredNodes.filter(
        (node) => node.data.type === selectedType
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredNodes = filteredNodes.filter(
        (node) =>
          node.data.label.toLowerCase().includes(query) ||
          node.data.description?.toLowerCase().includes(query)
      );
    }

    // Get IDs of filtered nodes
    const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));

    // Filter edges to only show connections between visible nodes
    const filteredEdges = graphData.edges.filter(
      (edge) =>
        filteredNodeIds.has(edge.source) && filteredNodeIds.has(edge.target)
    );

    return { nodes: filteredNodes, edges: filteredEdges };
  }, [graphData, searchQuery, selectedType]);

  useEffect(() => {
    if (filteredData) {
      // Auto-layout the nodes in a circular pattern if they don't have positions
      const layoutedNodes = filteredData.nodes.map((node, index) => {
        const angle = (index / filteredData.nodes.length) * 2 * Math.PI;
        const radius = Math.max(300, filteredData.nodes.length * 30);
        return {
          ...node,
          position: {
            x: 400 + radius * Math.cos(angle),
            y: 300 + radius * Math.sin(angle),
          },
        };
      });

      setNodes(layoutedNodes as any);
      setEdges(filteredData.edges as any);
    }
  }, [filteredData, setNodes, setEdges]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading knowledge graph...</p>
        </div>
      </div>
    );
  }

  if (!nodes.length) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start Building the Collective Mind
          </h2>
          <p className="text-gray-600 mb-4">
            Add your first concept to begin weaving the web of interconnected ideas.
          </p>
          <p className="text-sm text-gray-500">
            Click "Add Concept" above to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const typeColors: Record<string, string> = {
              idea: '#3b82f6',
              theory: '#8b5cf6',
              question: '#f59e0b',
              quote: '#10b981',
              term: '#6366f1',
              other: '#6b7280',
            };
            return typeColors[node.data.type] || '#6b7280';
          }}
        />
      </ReactFlow>
    </div>
  );
}
