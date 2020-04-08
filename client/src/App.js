import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Registration from "./views/Registration/Registration";
import Login from "./views/Login/Login";
import Help from './views/MainScreen/Help/Help'
import Neighborhood from './views/MainScreen/Neighborhood/Neighborhood'
import Orders from './views/MainScreen/Orders/Orders'
import Shop from './views/MainScreen/Shop/Shop'
import UserProfile from './views/MainScreen/UserProfile/UserProfile'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
        <Shop />
        </Route>
        <Route path='/help'>
            <Help />
        </Route>
        <Route path='/neighborhood'>
            <Neighborhood />
        </Route>
        <Route path='/orders'>
            <Orders />
        </Route>
        <Route path='/userProfile'>
            <UserProfile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Registration />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
