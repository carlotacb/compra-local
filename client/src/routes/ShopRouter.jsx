import React from 'react';
import { Switch, Route, useRouteMatch, Redirect, useParams } from "react-router-dom";
import { ShopErrorLocation, ShopSearch, ShopStore } from '../views';
import { ApiFactory } from "../services/ApiFactory";
import { UserContext } from '../context/UserContext';
import { Loading } from '../components/Loading/Loading';

export function ShopRouter() {
    const {user, setUser} = React.useContext(UserContext);
    const [inS, setIn] = React.useState(1);
    const [stores, setStores] = React.useState([]);
    const [location, setLocation] = React.useState(true);
    // TODO: Define routes
    let match = useRouteMatch();

    React.useEffect(()=> {
        if(match.path == '/in/' && (user != undefined) ) {
            const searchStoresAPI = ApiFactory.get('searchStores');
            searchStoresAPI(user)
            .then((s) => {
                var aStores = [...stores];
                aStores = s["local_list"];
                setStores(aStores)
            });
        }
    },[user]);

    if (user === undefined) {
        return (<Loading />)
    }

    // 1. CHECK LOCATION

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