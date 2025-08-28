import type { BaseColorVariant, TypographyVariant } from "@/types/components";
import MuiTypography from "@mui/material/Typography";

type TypographyComponent =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

type TypographyColor =
  | BaseColorVariant
  | "textPrimary"
  | "textSecondary"
  | "textDisabled";

type TypographyFontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type TypographyProps = {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  fontWeight?: TypographyFontWeight;
  fontSize?: number;
  className?: string;
  component?: TypographyComponent;
  dir?: "ltr" | "rtl";
};

export const Typography: React.FC<TypographyProps> = (props) => {
  return <MuiTypography {...props} />;
};

export default Typography;
