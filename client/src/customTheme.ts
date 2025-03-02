import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      textLabel: string;
      textLight: string;
      textTopNav: string;
      iconsSideNav: string;
      yellow: string;
      darkRed: string;
    };
  }

  interface PaletteOptions {
    customColors?: {
      textLabel: string;
      textLight: string;
      textTopNav: string;
      iconsSideNav: string;
      yellow: string;
      darkRed: string;
    };
  }
}

export const customTheme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    background: {
      default: "#f5f5fc",
    },
    text: {
      primary: "rgb(31, 31, 31)",
    },
    customColors: {
      textLabel: "#6610f2",
      textLight: "#4b6380",
      textTopNav: "#8b8a8a",
      iconsSideNav: "#9298a4",
      yellow: "#f57c00",
      darkRed: "#7f0000",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background:
            "linear-gradient(94deg, rgb(0 117 180) 0%, rgb(65 162 215 / 92%) 100%)",
          color: "#fff",
          borderRight: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#202128",
          color: "#fff",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "small",
        },
      },
    },
  },
});
