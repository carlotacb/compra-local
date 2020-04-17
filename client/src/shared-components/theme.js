import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const t = createMuiTheme({
    palette: {
      primary: {
          main: '#9777B5'
      },
      secondary: {
          light: '#FFFAF7',
          main: '#F2B880'
      },
    },
    typography: {
        h1: {
            fontSize: '30pt',
            fontWeight:'600',
            color: '#9777B5'
        },
        h2: {
            fontSize: '28pt',
            fontWeight: '600',
            color: grey[800]
        }
    }
});

export const theme =  responsiveFontSizes(t);