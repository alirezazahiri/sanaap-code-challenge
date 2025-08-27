import { BaseColorVariant } from "@/types/components";
import TextField from "@mui/material/TextField";

type TextInputVariant = "outlined";
type TextInputSize = "small" | "medium";

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  variant?: TextInputVariant;
  fullWidth?: boolean;
  size?: TextInputSize;
  color?: BaseColorVariant;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
  return <TextField {...props} />;
};
