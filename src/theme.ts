"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#017785",
      disabled: "#BFD5D8",
      contrastText: "#ffffff",
    },
    error: {
      main: "#D32F2F",
      light: "#F8DEE1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F6F6F8",
      paper: "#ffffff",
    },
    divider: "#D2D1D1",
  },
  typography: {
    fontFamily: "var(--font-vazirmatn)",
  },
  shadows: [
    "none",
    "0px 1px 2px 0px #1C487015",
    "0px 1px 3px 0px #1C487020",
    "0px 2px 4px 0px #1C487025",
    "0px 2px 5px 0px #1C487025",
    "0px 3px 5px 0px #1C487027",
    "0px 3px 6px 0px #1C487029",
    "0px 4px 8px 0px #1C48702B",
    "0px 5px 10px 0px #1C48702D",
    "0px 6px 12px 0px #1C487030",
    "0px 7px 14px 0px #1C487032",
    "0px 8px 16px 0px #1C487035",
    "0px 9px 18px 0px #1C487037",
    "0px 10px 20px 0px #1C48703A",
    "0px 12px 24px 0px #1C48703D",
    "0px 14px 28px 0px #1C487040",
    "0px 16px 32px 0px #1C487043",
    "0px 18px 36px 0px #1C487046",
    "0px 20px 40px 0px #1C487049",
    "0px 22px 44px 0px #1C48704C",
    "0px 24px 48px 0px #1C48704F",
    "0px 26px 52px 0px #1C487052",
    "0px 28px 56px 0px #1C487055",
    "0px 30px 60px 0px #1C487058",
    "0px 32px 64px 0px #1C48705B",
  ],
  shape: {
    borderRadius: 10,
  },
});

export default theme;
