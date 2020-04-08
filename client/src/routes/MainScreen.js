import React from "react";
import { Switch, Route } from "react-router-dom";

import Help from '../views/MainScreen/Help/Help'
import Neighborhood from '../views/MainScreen/Neighborhood/Neighborhood'
import Orders from '../views/MainScreen/Orders/Orders'
import Shop from '../views/MainScreen/Shop/Shop'
import UserProfile from '../views/MainScreen/UserProfile/UserProfile'

function MainScreen() {

    return (
        <div>
            <Switch>
                <Route path='/help'>
                    <Help />
                </Route>
                <Route path='/neighborhood'>
                    <Neighborhood />
                </Route>
                <Route path='/orders'>
                    <Orders />
                </Route>
                <Route path='/shop'>
                    <Shop />
                </Route>
                <Route path='/userProfile'>
                    <UserProfile />
                </Route>
            </Switch>
        </div>
    )
}

export default MainScreen;