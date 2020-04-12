import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import { BaseRouter } from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './shared-components/theme';

import { CookiesProvider } from 'react-cookie';

function App() {
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <BaseRouter />
        </CookiesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
