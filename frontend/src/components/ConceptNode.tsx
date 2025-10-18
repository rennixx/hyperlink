import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ConceptNodeProps {
  data: {
    label: string;
    description?: string;
    type: string;
    createdBy: string;
    connectionCount?: number;
  };
}

function ConceptNode({ data }: ConceptNodeProps) {
  const typeColors: Record<string, { bg: string; border: string; text: string }> = {
    idea: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700' },
    theory: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700' },
    question: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700' },
    quote: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700' },
    term: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-700' },
    other: { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-700' },
  };

  const colors = typeColors[data.type] || typeColors.other;

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${colors.bg} ${colors.border} shadow-lg min-w-[150px] max-w-[250px] relative`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      {data.connectionCount !== undefined && data.connectionCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
          {data.connectionCount}
        </div>
      )}

      <div>
        <div className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
          {data.label}
        </div>

        {data.description && (
          <div className="text-xs text-gray-600 line-clamp-2 mb-2">
            {data.description}
          </div>
        )}

        <div className={`text-xs ${colors.text} font-medium`}>
          {data.type}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(ConceptNode);
