import type { OverridableStringUnion } from "./mui";
import type { TypographyVariant } from "@mui/material";
import type {
  TextFieldPropsColorOverrides,
  TypographyPropsVariantOverrides,
} from "@mui/material";

export type BaseColorVariant =
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

export type TypographyVariant = TypographyVariant | "inherit";
