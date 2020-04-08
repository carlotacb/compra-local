import React from 'react';
import PrimaryButton from './lib/Button/PrimaryButton';
import SecondaryButton from './lib/Button/SecondaryButton';
import { ThemeProvider, Typography } from '@material-ui/core';
import theme from './lib/theme';
import TertiaryButton from './lib/Button/TertiaryButton';
import SpanAlert from './lib/Span/SpanAlert';
import SidebarItem from './lib/Sidebar/SidebarItem';


function App() {

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div>
                    <h1>Buttons</h1>
                    <PrimaryButton>
                        CERCAR
                </PrimaryButton>
                    <br />
                    <br />
                    <SecondaryButton>
                        CERCAR
                </SecondaryButton>
                    <br />
                    <br />
                    <TertiaryButton>
                        CERCAR
                    </TertiaryButton>
                </div>
                <div>
                    <h1>Alerts</h1>
                    <SpanAlert message="error">
                        <Typography variant="body1">
                            Error! La contraseña introducida es incorrecta
                        </Typography>
                    </SpanAlert>

                    <SpanAlert message="warning">
                        <Typography variant="body1">
                            Error! La contraseña introducida es incorrecta
                        </Typography>
                    </SpanAlert>

                    <SpanAlert message="success">
                        <Typography variant="body1">
                            Error! La contraseña introducida es incorrecta
                        </Typography>
                    </SpanAlert>
                </div>
                <div>
                    <SidebarItem>
                        Compra
                    </SidebarItem>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default App;