import React from 'react';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext } from '../context';
import { Login, Register } from '../views';
import { AppRouter } from './index';

export function BaseRouter() {

    const [user, setUser] = React.useState(null);
    const providerValue = React.useMemo(()=> ({user, setUser}), [user, setUser]);
    
    return (
        <Router>
            <UserContext.Provider value={providerValue}>
                <Route exact path="/">
                    {JSON.stringify(user, null, 2)}
                    {/*TODO: Decide where to redirect*/}
                </Route>
                <Route path="/in">
                    <AppRouter />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/registre">
                    <Register />
                </Route>
                <Route>
                    {/*TODO: Where to redirect with a not existing URL*/}
                </Route>
            </UserContext.Provider>
        </Router>
    )
}