import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const t = createMuiTheme({
    palette: {
        primary: {
            light: '#F6E8EA',
            main: '#EF626C',
            dark: '#A4243B'
        },
        secondary: {
            main: '#F7C15A',
            dark: '#A57F60'
        },
        dark: {
            main: '#084C61',
            dark: '#292F36',
        },
      },
    typography: {
        h1: {
            fontSize: '30pt',
            fontWeight:'600',
            color: '#EF626C'
        },
        h2: {
            fontSize: '28pt',
            fontWeight: '600',
            color: grey[800]
        }
    }
});

export const theme =  responsiveFontSizes(t);