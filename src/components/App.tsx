import { ThemeProvider } from '@material-ui/styles';
import mainTheme from 'src/themes/mainTheme';
import Dashboard from 'src/components/Dashboard';

const App = () =>  { 
  return (
    <ThemeProvider theme={mainTheme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;