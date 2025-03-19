// src/App.js
import React from 'react';
import { Portfolio, DotCursor } from './components';

function App() {
  return (
    <div className="App relative min-h-screen bg-gray-50 dark:bg-gray-900 selection:bg-primary-500/20 selection:text-primary-500">
      <DotCursor />
      <Portfolio />
    </div>
  );
}

export default App;