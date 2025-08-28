import {
  Label,
  TextInput,
  Typography,
  type TextInputProps,
} from "@/components/ui";
import classes from "./styles.module.css";
import { forwardRef } from "react";

type FormTextInputProps = Omit<TextInputProps, "name" | "error"> & {
  label?: string;
  name: string;
  error?: string;
};

export const FormTextInput = forwardRef<HTMLInputElement, FormTextInputProps>(
  ({ label, name, error = "", ...props }, ref) => {
    return (
      <div className={classes.container}>
        {label && (
          <Label
            name={name}
            variant="body2"
            color="textPrimary"
            className={classes.label}
          >
            {label}
          </Label>
        )}
        <TextInput
          id={name}
          name={name}
          ref={ref}
          label={label}
          error={!!error}
          {...props}
        />
        {error && <Typography className={classes.error}>{error}</Typography>}
      </div>
    );
  }
);

FormTextInput.displayName = "FormTextInput";
