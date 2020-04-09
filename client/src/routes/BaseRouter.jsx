import React, { useContext } from 'react';
import { Switch, Route } from "react-router-dom";
import { UserContext } from '../context';
import { Login, Registration } from '../views';
import { AppRouter } from './index';


export function BaseRouter() {
    const {authInfo, setAuthInfo} = useContext(UserContext);

    return (
        <Switch>
            <Route exact path="/">
                {authInfo}
                {/*TODO: Decide where to redirect*/}
            </Route>
            <Route path="/in">
                <AppRouter />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/registre">
                <Registration />
            </Route>
            <Route>
                {/*TODO: Where to redirect with a not existing URL*/}
            </Route>
        </Switch>
    )
}