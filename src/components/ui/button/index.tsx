import { BaseColorVariant } from "@/types/components";
import { Button as MuiButton } from "@mui/material";
import Link from "next/link";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "text" | "outlined" | "contained";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: BaseColorVariant | "inherit";
  fullWidth?: boolean;
  loading?: boolean;
  endIcon?: React.ReactNode;
  href?: string;
};

export const Button: React.FC<ButtonProps> = ({
  color = "inherit",
  ...props
}) => {
  return <MuiButton {...props} color={color} LinkComponent={Link} />;
};
