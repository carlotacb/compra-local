<<<<<<< HEAD
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {ui} from 'client-library-ui';
function App() {
  return (
    <div>
        <ui.PrimaryButton>
          TEST
        </ui.PrimaryButton>
    </div>
=======
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
>>>>>>> 812ad990621f2f2b5c2b83e3e3a517434eb31047
  );
}

export default App;
