import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // 1순위 컬러(대표 색)
    primary: {
      main: '#ffffff',
    },
    // 2순위 컬러(보조 색)
    secondary: {
      main: '#000000',
    },
  },
});

export default theme;
