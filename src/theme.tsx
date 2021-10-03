import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
          main: '#2A2E4F',
        },
        secondary: {
          main: '#45788d',
        },
        background: {
          default: '#fdfdfd',
          paper: '#f7f6f6',
        },
      },
});

export default theme;

