import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import { BaseRouter } from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './shared-components/theme';

import { CookiesProvider } from 'react-cookie';

import { PathContext } from './context';

function App() {

  const [path, setPath] = React.useState("/in");
  const pathproviderValue = React.useMemo(() => ({ path, setPath }), [path, setPath]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <PathContext.Provider value={pathproviderValue}>
            <BaseRouter />
          </PathContext.Provider>
        </CookiesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;