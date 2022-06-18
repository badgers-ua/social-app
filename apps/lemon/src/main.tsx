import 'typeface-roboto';
import './index.css';
import './i18n';
import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import useThemeLocal from './app/hooks/useThemeLocal';
import FirebaseProviderLocal from './app/providers/FirebaseProviderLocal';
import GlobalLinearProgress from './app/components/GlobalLinearProgress';
import LoaderStoreProvider from './app/providers/store/loader/LoaderStoreProvider';
import SnackbarProviderLocal from './app/providers/SnackbarProviderLocal';
import AxiosProvider from './app/providers/AxiosProvider';

const Main = () => {
  const theme = useThemeLocal();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProviderLocal>
        <FirebaseProviderLocal>
          <LoaderStoreProvider>
            <AxiosProvider>
              <>
                <GlobalLinearProgress />
                <App />
              </>
            </AxiosProvider>
          </LoaderStoreProvider>
        </FirebaseProviderLocal>
      </SnackbarProviderLocal>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
