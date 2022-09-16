import { createTheme, responsiveFontSizes } from '@mui/material';
import { grey } from '@mui/material/colors';

export const lightTheme = responsiveFontSizes(createTheme({
  // props: {
  //   MuiAppBar: {
  //     position: "sticky",
  //   },
  //   MuiCard: {
  //     elevation: 0,
  //   },
  // },
  // overrides: {
  //   MuiAppBar: {
  //     root: {
  //       background: "#fff !important",
  //     },
  //   },
  // },
  palette: {
    background: {
      default: "#fff",
    },
  },
}));

export const darkTheme = responsiveFontSizes(createTheme({
  // props: {
  //   MuiAppBar: {
  //     position: "sticky",
  //   },
  //   MuiCard: {
  //     elevation: 0,
  //   },
  // },
  palette: {
    mode: "dark",
    background: {
      default: grey[900],
      paper: grey[800],
    },
  },
  // overrides: {
  //   MuiTable: {
  //     root: {
  //       background: "transparent !important",
  //     },
  //   },
  //   MuiTypography: {
  //     root: {
  //       color: grey[400],
  //     },
  //   },
  // },
}));
