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
  );
}

export default App;
