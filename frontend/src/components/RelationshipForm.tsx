import { useState, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRelationship, getConcepts } from '../lib/api';
import { getCurrentUser, isConceptOwnedByUser } from '../lib/user';
import type { CreateRelationshipInput, RelationshipType } from '../types';

interface RelationshipFormProps {
  onClose: () => void;
}

const relationshipTypes: RelationshipType[] = [
  'influences',
  'contradicts',
  'evolves_from',
  'example_of',
  'related_to',
  'supports',
  'opposes',
  'explains',
  'questions',
  'extends',
];

export default function RelationshipForm({ onClose }: RelationshipFormProps) {
  const currentUser = getCurrentUser();
  const [formData, setFormData] = useState<CreateRelationshipInput>({
    sourceConceptId: '',
    targetConceptId: '',
    relationshipType: 'related_to',
    description: '',
    createdBy: currentUser,
  });
  const [error, setError] = useState<string>('');

  const queryClient = useQueryClient();

  const { data: concepts = [] } = useQuery({
    queryKey: ['concepts'],
    queryFn: () => getConcepts({ limit: 100 }),
  });

  const mutation = useMutation({
    mutationFn: createRelationship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['graph'] });
      queryClient.invalidateQueries({ queryKey: ['relationships'] });
      onClose();
    },
    onError: (error: any) => {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Failed to create relationship. Please try again.');
      }
    },
  });

  // Filter concepts to show only those the user can link
  // User can link if: they own the concept OR they are anonymous
  const linkableConcepts = useMemo(() => {
    if (currentUser === 'anonymous') {
      return concepts; // Anonymous can link anything
    }
    return concepts.filter(c => isConceptOwnedByUser(c.createdBy));
  }, [concepts, currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.sourceConceptId && formData.targetConceptId) {
      mutation.mutate({
        ...formData,
        createdBy: currentUser,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Link Concepts</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {currentUser === 'anonymous' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              As an anonymous user, you can link any concepts together.
              Enter your name when creating concepts to track your contributions!
            </p>
          </div>
        )}

        {currentUser !== 'anonymous' && linkableConcepts.length === 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              You need to create some concepts first before you can link them.
              Only concepts you created can be linked by you.
            </p>
          </div>
        )}

        {currentUser !== 'anonymous' && linkableConcepts.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              You can only link concepts you created ({linkableConcepts.length} available).
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source Concept *
            </label>
            <select
              value={formData.sourceConceptId}
              onChange={(e) =>
                setFormData({ ...formData, sourceConceptId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            >
              <option value="">Select a concept...</option>
              {linkableConcepts.map((concept) => (
                <option key={concept.id} value={concept.id}>
                  {concept.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship Type *
            </label>
            <select
              value={formData.relationshipType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  relationshipType: e.target.value as RelationshipType,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            >
              {relationshipTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Concept *
            </label>
            <select
              value={formData.targetConceptId}
              onChange={(e) =>
                setFormData({ ...formData, targetConceptId: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              required
            >
              <option value="">Select a concept...</option>
              {concepts
                .filter((c) => c.id !== formData.sourceConceptId)
                .map((concept) => (
                  <option key={concept.id} value={concept.id}>
                    {concept.title}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              rows={2}
              placeholder="Add context to this relationship..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={formData.createdBy}
              onChange={(e) =>
                setFormData({ ...formData, createdBy: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
              placeholder="anonymous"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? 'Creating...' : 'Create Link'}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
