import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, Registration } from './views';
import { AppRouter } from "./routes";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/in">
          <AppRouter />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registre">
          <Registration />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
