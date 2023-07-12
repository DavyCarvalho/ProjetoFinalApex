import React from 'react';
import './styles/App.css';
import Router from './router';

/**
 * Componente principal da aplicação.
 * Responsável por renderizar o componente Router, que gerencia as rotas da aplicação.
 */
function App() {
  return (
    <div className="App">
      <Router />{/* Componente Router para gerenciamento das rotas */}
    </div>
  );
}

export default App;
