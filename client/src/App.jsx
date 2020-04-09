import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, Registration } from './views';
import { AppRouter } from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './shared-components/theme';

function App() {

  return (
    <Router>
      <Switch>
        <ThemeProvider theme={theme}>
          <Route path="/in">
            <AppRouter />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/registre">
            <Registration />
          </Route>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
