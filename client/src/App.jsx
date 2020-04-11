import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import { BaseRouter } from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './shared-components/theme';


function App() {
  
  return (
    <Router>
      <ThemeProvider theme={theme}>
          <BaseRouter />
      </ThemeProvider>
    </Router>
  );
}

export default App;
