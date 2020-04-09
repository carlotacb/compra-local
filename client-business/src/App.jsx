import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register'
import { AppRouter } from "./routes";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
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
      </Switch>
    </Router>
  );
}

export default App;
