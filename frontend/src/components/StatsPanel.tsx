import { useQuery } from '@tanstack/react-query';
import { getGraphStats, getConcepts } from '../lib/api';

interface StatsPanelProps {
  onRandomConcept?: (conceptId: string) => void;
}

export default function StatsPanel({ onRandomConcept }: StatsPanelProps) {
  const { data: stats } = useQuery({
    queryKey: ['graph-stats'],
    queryFn: getGraphStats,
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  const { data: allConcepts } = useQuery({
    queryKey: ['all-concepts'],
    queryFn: () => getConcepts({ limit: 1000 }),
  });

  const handleRandomClick = () => {
    if (allConcepts && allConcepts.length > 0 && onRandomConcept) {
      const randomIndex = Math.floor(Math.random() * allConcepts.length);
      onRandomConcept(allConcepts[randomIndex].id);
    }
  };

  if (!stats) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[200px] z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Graph Stats
        </h3>
        <button
          onClick={handleRandomClick}
          className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
          title="Discover a random concept"
        >
          🎲 Random
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Concepts:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {stats.concepts}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Links:</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {stats.relationships}
          </span>
        </div>

        {stats.typeDistribution && stats.typeDistribution.length > 0 && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                By Type:
              </div>
            </div>
            {stats.typeDistribution.map((item: any) => (
              <div key={item.type} className="flex justify-between items-center text-xs">
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {item.type}:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {item._count}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
