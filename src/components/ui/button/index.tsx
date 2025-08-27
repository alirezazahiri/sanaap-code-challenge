import { BaseColorVariant } from "@/types/components";
import { Button as MuiButton } from "@mui/material";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "text" | "outlined" | "contained";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: BaseColorVariant;
  fullWidth?: boolean;
  loading?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton {...props} />;
};
