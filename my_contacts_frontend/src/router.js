import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Login from './pages/login'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}