import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login'; // Importa o componente de Login para ser renderizado na rota '/login'
import Home from './pages/home'; // Importa o componente de Home para ser renderizado na rota '/home'

// Componente responsável por gerenciar as rotas da aplicação
export default function Router() {
  return (
    <BrowserRouter> {/* Componente que fornece a funcionalidade de roteamento para a aplicação */}
      <Switch> {/* Componente que renderiza apenas a primeira rota que corresponde ao caminho do URL */}
        <Redirect exact from='/' to='/login' /> {/* Redireciona a rota raiz para a rota '/login' */}
        <Route path='/login' component={Login} /> {/* Rota para o componente de login */}
        <Route path='/home' component={Home} /> {/* Rota para o componente de home */}
      </Switch>
    </BrowserRouter>
  );
}
