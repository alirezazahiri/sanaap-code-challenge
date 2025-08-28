import { Label, Select, SelectProps } from "@/components/ui";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { forwardRef } from "react";
import classes from "./styles.module.css";

export type FormSelectProps = Omit<SelectProps, "name"> & {
  helperText?: string;
  disabled?: boolean;
  loading?: boolean;
  name: string;
  error?: string;
};

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      fullWidth,
      loading,
      disabled,
      label,
      labelId,
      helperText,
      name,
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className={classes.container}>
        {label && (
          <Label
            name={name}
            variant="body2"
            color="textPrimary"
            className={classes.outterLabel}
          >
            {label}
          </Label>
        )}
        <FormControl
          disabled={loading || disabled}
          fullWidth={fullWidth}
          error={!!error}
        >
          <InputLabel className={classes.innerLabel} id={labelId}>
            {label}
          </InputLabel>
          <Select
            name={name}
            {...props}
            ref={ref}
            disabled={loading || disabled}
            fullWidth={fullWidth}
          />
          <FormHelperText>{error || helperText}</FormHelperText>
        </FormControl>
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
