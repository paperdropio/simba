import React from 'react';
import './App.css';
import TestComp from './components/testComp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestComp message="This is a test from props" data="345345"  />
      </header>
    </div>
  );
}

export default App;
