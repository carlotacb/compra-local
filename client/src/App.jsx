import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import { BaseRouter } from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './shared-components/theme';

import { UserContext } from './context';

function App() {

  const [authInfo, setAuthInfo] = React.useState('mec');

  const providerValue = React.useMemo(()=> ({authInfo, setAuthInfo}), [authInfo, setAuthInfo]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={providerValue}>
          <BaseRouter />
        </UserContext.Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
