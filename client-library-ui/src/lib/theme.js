import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

export default responsiveFontSizes(theme);