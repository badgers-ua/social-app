import { Children } from './types';
import { useUser } from 'reactfire';
import { BrowserRouter as Router } from 'react-router-dom';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Container } from '@mui/material';
import RoutesLocal from './RoutesLocal';
import HeaderContainer from './containers/HeaderContainer';
import useSetLoadingStatus from './hooks/useSetLoadingStatus';

const App = () => {
  const theme: any = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppGuard>
      <Router>
        <HeaderContainer />
        <Box pt={`${isXs ? '56px' : '64px'}`}>
          <Container maxWidth="lg">
            <RoutesLocal />
          </Container>
        </Box>
      </Router>
    </AppGuard>
  );
};

const AppGuard = ({ children }: Children) => {
  // TODO: bug userStatus is always 'success'
  const { status: userStatus } = useUser();
  const isLoading: boolean = userStatus === 'loading';

  useSetLoadingStatus({ isLoading });

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
};

export default App;
