import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

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
    typography: {}
});

export const theme =  responsiveFontSizes(t);