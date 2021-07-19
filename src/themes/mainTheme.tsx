import { createTheme } from '@material-ui/core/styles';

const blue = "#0B72B9";
const orange = "#FFBA60";

const theme = createTheme({
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: orange,
    },
  },
});

export default theme;