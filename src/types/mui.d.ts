import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    disabled?: string;
  }

  interface SimplePaletteColorOptions {
    disabled?: string;
  }
}
