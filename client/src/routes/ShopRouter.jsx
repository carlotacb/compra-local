import React from 'react';
import { Switch, Route, useRouteMatch, Redirect, useParams } from "react-router-dom";
import { ShopErrorLocation, ShopSearch, ShopStore } from '../views';
import { StoreContext } from '../context/StoreContext';
import { ApiFactory } from "../services/ApiFactory";

export function ShopRouter() {
    const [inS, setIn] = React.useState(1);
    const [stores, setStores] = React.useState([]);
    // TODO: Define routes
    let match = useRouteMatch();

    React.useEffect(()=> {
        if(match.path == '/in/') {
            const searchStoresAPI = ApiFactory.get('searchStores');
            var lat = undefined;
            var long = undefined;
            searchStoresAPI(lat, long)
            .then((s) => {
                setStores(s)
            });
        }
    },[inS]);

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
                    <ShopSearch stores={stores} />
                </Route>
                <Route exact path={`${match.path}:id`}>
                    <ShopStore />
                </Route>
            </Switch>
        </div>
    )
}