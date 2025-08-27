import type { BaseColorVariant } from "@/types/components";
import { IconButton as MuiIconButton } from "@mui/material";

type IconButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: BaseColorVariant;
  size?: "small" | "medium" | "large";
};

export const IconButton: React.FC<IconButtonProps> = (props) => {
  return <MuiIconButton {...props} />;
};
