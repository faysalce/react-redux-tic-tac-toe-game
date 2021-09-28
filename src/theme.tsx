import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
          main: '#03256C',
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

