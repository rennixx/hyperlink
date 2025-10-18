import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Graph from './components/Graph';
import ConceptForm from './components/ConceptForm';
import RelationshipForm from './components/RelationshipForm';
import ConceptDetail from './components/ConceptDetail';
import StatsPanel from './components/StatsPanel';
import Header from './components/Header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [showConceptForm, setShowConceptForm] = useState(false);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC - Close modals/panels
      if (e.key === 'Escape') {
        setShowConceptForm(false);
        setShowRelationshipForm(false);
        setSelectedConceptId(null);
      }

      // / - Focus search (when not in input)
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }

      // C - Add Concept
      if (e.key === 'c' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowConceptForm(true);
      }

      // L - Add Link/Relationship
      if (e.key === 'l' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowRelationshipForm(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExportImage = () => {
    // Simple download trigger for now - the actual implementation would use html-to-image
    // For MVP, we'll just show an alert
    alert('Export feature: This would export the current graph as a PNG image. Implementation coming soon!');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header
          onAddConcept={() => setShowConceptForm(true)}
          onAddRelationship={() => setShowRelationshipForm(true)}
          onExportImage={handleExportImage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <main className="flex-1 relative">
          <Graph
            searchQuery={searchQuery}
            selectedType={selectedType}
            onNodeClick={setSelectedConceptId}
          />
        </main>

        {showConceptForm && (
          <ConceptForm onClose={() => setShowConceptForm(false)} />
        )}

        {showRelationshipForm && (
          <RelationshipForm onClose={() => setShowRelationshipForm(false)} />
        )}

        {selectedConceptId && (
          <ConceptDetail
            conceptId={selectedConceptId}
            onClose={() => setSelectedConceptId(null)}
          />
        )}

        <StatsPanel onRandomConcept={setSelectedConceptId} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
