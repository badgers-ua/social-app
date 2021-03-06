import { useMemo } from 'react';
import createTheme from '@mui/material/styles/createTheme';

const useThemeLocal = () => {
  const prefersDarkMode = true;
  // TODO: Auto Theme switching
  // const prefersDarkMode: boolean = useMediaQuery(
  //   '(prefers-color-scheme: dark)',
  // );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return theme;
};

export default useThemeLocal;
