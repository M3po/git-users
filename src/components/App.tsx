import { ThemeProvider } from '@material-ui/styles';
import mainTheme from 'src/themes/mainTheme';
import MainScreen from 'src/components/screens/MainScreen';

const App = () =>  { 
  return (
    <ThemeProvider theme={mainTheme}>
      <MainScreen />
    </ThemeProvider>
  );
}

export default App;