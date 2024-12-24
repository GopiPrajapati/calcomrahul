import React from 'react';
import {TaskProvider} from './src/context/AppContext';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {
  return (
    <TaskProvider>
      <RootNavigation />
    </TaskProvider>
  );
}
