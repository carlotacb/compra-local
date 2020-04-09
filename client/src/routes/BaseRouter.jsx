import React from 'react';
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { UserContext } from '../context';
import { Login, Registration } from '../views';
import { AppRouter } from './index';

export function BaseRouter() {

    const [user, setUser] = React.useState(null);
  
    const providerValue = React.useMemo(()=> ({user, setUser}), [user, setUser]);

    console.log(user);

    return (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/in">IDK</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Registre</Link></li>
                </ul>
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
                    <Registration />
                </Route>
                <Route>
                    {/*TODO: Where to redirect with a not existing URL*/}
                </Route>
                </UserContext.Provider>
            </div>
        </Router>
    )
}