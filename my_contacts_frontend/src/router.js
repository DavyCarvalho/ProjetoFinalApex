import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login'
import Home from './pages/home';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    );
}