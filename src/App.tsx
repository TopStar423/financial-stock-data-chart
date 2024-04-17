import React, { useState } from 'react';
import './App.css';
import { FinancialChart } from './components/FinancialChart';
import { SymbolSelector } from './components/SymbolSelector';
import { SYMBOLS } from './constants/symbols';

function App() {
  const [symbol, setSymbol] = useState<string>(SYMBOLS[0]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Financial Data Dashboard</h1>
        <SymbolSelector symbols={SYMBOLS} value={symbol} onChange={setSymbol} />
        <FinancialChart symbol={symbol} />
      </header>
    </div>
  );
}

export default App;
