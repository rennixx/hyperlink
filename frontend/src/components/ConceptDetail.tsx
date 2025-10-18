import { useQuery } from '@tanstack/react-query';
import { getConceptById } from '../lib/api';

interface ConceptDetailProps {
  conceptId: string;
  onClose: () => void;
}

export default function ConceptDetail({ conceptId, onClose }: ConceptDetailProps) {
  const { data: concept, isLoading } = useQuery({
    queryKey: ['concept', conceptId],
    queryFn: () => getConceptById(conceptId),
  });

  if (isLoading) {
    return (
      <div className="fixed right-0 top-16 bottom-0 w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl p-6 overflow-y-auto">
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!concept) {
    return null;
  }

  const typeColors: Record<string, string> = {
    idea: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    theory: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    question: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    quote: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    term: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  return (
    <div className="fixed right-0 top-16 bottom-0 w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl overflow-y-auto">
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Concept Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
              typeColors[concept.type] || typeColors.other
            }`}
          >
            {concept.type.charAt(0).toUpperCase() + concept.type.slice(1)}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {concept.title}
          </h3>
          {concept.description && (
            <p className="text-gray-600 dark:text-gray-300">{concept.description}</p>
          )}
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Created by: {concept.createdBy}</p>
          <p>Created: {new Date(concept.createdAt).toLocaleDateString()}</p>
        </div>

        {concept.outgoingRelationships && concept.outgoingRelationships.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Outgoing Connections
            </h4>
            <div className="space-y-2">
              {concept.outgoingRelationships.map((rel: any) => (
                <div
                  key={rel.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {rel.relationshipType.replace(/_/g, ' ')}
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {rel.targetConcept.title}
                  </div>
                  {rel.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {rel.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {concept.incomingRelationships && concept.incomingRelationships.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Incoming Connections
            </h4>
            <div className="space-y-2">
              {concept.incomingRelationships.map((rel: any) => (
                <div
                  key={rel.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    {rel.relationshipType.replace(/_/g, ' ')}
                  </div>
                  <div className="text-gray-900 dark:text-white font-medium">
                    {rel.sourceConcept.title}
                  </div>
                  {rel.description && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {rel.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
