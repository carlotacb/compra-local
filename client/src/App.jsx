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
            <Registration />
          </Route>
          <Route>
            {/*TODO: Where to redirect with a not existing URL*/}
          </Route>
        </ThemeProvider>
      </Switch>
    </Router>
  );
}

export default App;
