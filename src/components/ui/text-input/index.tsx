import { BaseColorVariant } from "@/types/components";
import InputAdornment  from "@mui/material/InputAdornment";
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
  endAdornment?: React.ReactNode;
};

type SlotProps = {
  input: {
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
  }
}

const getSlotProps = (
  slotProps: Pick<TextInputProps, "startAdornment" | "endAdornment">
) => {
  const result: SlotProps = {
    input: {
      startAdornment: undefined,
      endAdornment: undefined,
    },
  };
  if (slotProps.startAdornment) {
    result.input.startAdornment = (
        <InputAdornment position="start">{slotProps.startAdornment}</InputAdornment>
    );
  }
  if (slotProps.endAdornment) {
    result.input.endAdornment = (
        <InputAdornment position="end">{slotProps.endAdornment}</InputAdornment>
        );
      
  }
  return result.input.startAdornment || result.input.endAdornment ? result : undefined;

};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ startAdornment, endAdornment, ...props }, ref) => {
    const slotProps = getSlotProps({ startAdornment, endAdornment });
    return <TextField {...props} inputRef={ref} slotProps={slotProps} />;
  }
);

TextInput.displayName = "TextInput";
