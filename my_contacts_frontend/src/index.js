import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Criação do root usando ReactDOM.createRoot para renderizar a aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App dentro do root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
