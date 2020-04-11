import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { ShopErrorLocation, ShopSearch, ShopStore } from '../views';
import { StoreContext } from '../context/StoreContext';

export function ShopRouter() {
    // TODO: Define routes
    let match = useRouteMatch();
    // 1. CHECK LOCATION
    const [location, setLocation] = React.useState(true);
    return (
        <div>
            {
                (match.path.includes('/in/') && location === false) &&
                <Redirect to="/in/error" /> 
            }
            <Switch>
                <Route exact path={`${match.path}error`}>
                    <ShopErrorLocation />
                </Route>
                <Route exact path={`${match.path}`}>
                    <ShopSearch />
                </Route>
                <Route exact path={`${match.path}:id`}>
                        <ShopStore />
                </Route>
            </Switch>
        </div>
    )
}