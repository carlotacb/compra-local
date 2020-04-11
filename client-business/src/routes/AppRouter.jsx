import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import { Sell } from '../views/Sell/Sell'
import { Profile } from '../views/Profile/Profile'

export function AppRouter() {

    let match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route path={`${match.path}/vendes`}>
                    <Sell />
                </Route>
                <Route path={`${match.path}/perfil`}>
                    <Profile />
                </Route>
            </Switch>
        </div>
    )
}


