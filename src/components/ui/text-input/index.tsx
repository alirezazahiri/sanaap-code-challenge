import { BaseColorVariant } from "@/types/components";
import TextField from "@mui/material/TextField";
import { forwardRef } from "react";

type TextInputVariant = "outlined";
type TextInputSize = "small" | "medium";

export type TextInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  variant?: TextInputVariant;
  fullWidth?: boolean;
  size?: TextInputSize;
  color?: BaseColorVariant;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
};

const getSlotProps = ({
  startAdornment,
}: Pick<TextInputProps, "startAdornment">) => {
  return startAdornment
    ? {
        input: {
          startAdornment,
        },
      }
    : {};
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ startAdornment, ...props }, ref) => {
    const slotProps = getSlotProps({ startAdornment });

    return <TextField {...props} inputRef={ref} {...slotProps} />;
  }
);

TextInput.displayName = "TextInput";
