import { BaseColorVariant } from "@/types/components";
import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

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

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return <TextField {...props} inputRef={ref} />;
  }
);

TextInput.displayName = "TextInput";
