import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ShopRouter } from './ShopRouter';
import Sidebar from '../components/SideBar';
import {PrimaryButton} from '../shared-components';

export function AppRouter() {

    let match = useRouteMatch();

    return (
        <div>
            <PrimaryButton>
                CERCAR
            </PrimaryButton>
            <Sidebar />    
            <Switch>
                <Route path={`${match.path}/veinat`}>
                    <p>veinat</p>
                </Route>
                <Route path={`${match.path}/comandes`}>
                    <p>comandes</p>
                </Route>
                <Route path={`${match.path}/perfil`}>
                    <p>perfil</p>
                </Route>
                <Route path={`${match.path}/`}>
                    shop
                    <ShopRouter />
                </Route>
            </Switch>
        </div>
    )
}


