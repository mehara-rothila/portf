// src/App.js - Optimized for performance
import React, { Suspense, lazy } from 'react';
import { DotCursor } from './components';

// Lazy load Portfolio for better initial loading performance
const Portfolio = lazy(() => import('./components/Portfolio'));

// Loading component while Portfolio is loading
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="App relative min-h-screen bg-gray-50 dark:bg-gray-900 selection:bg-primary-500/20 selection:text-primary-500">
      {/* DotCursor loads immediately as it's critical for UX */}
      <DotCursor />
      
      {/* Suspense for lazy loading Portfolio */}
      <Suspense fallback={<Loading />}>
        <Portfolio />
      </Suspense>
    </div>
  );
}

// Add displayName for better debugging
App.displayName = 'App';

export default App;