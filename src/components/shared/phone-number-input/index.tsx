"use client";

import { IMaskInput } from "react-imask";
import { forwardRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase, {
  type InputBaseComponentProps,
  type InputBaseProps,
} from "@mui/material/InputBase";
import { Divider, Label, Typography } from "@/components/ui";
import classes from "./styles.module.css";
import { unmaskPhoneNumber } from "@/lib/phone-number";

interface TextMaskPhoneNumberProps extends InputBaseComponentProps {
  name: string;
}
const TextMaskPhoneNumber = forwardRef<
  HTMLInputElement,
  TextMaskPhoneNumberProps
>(({ onChange, ...props }, ref) => {
  const handleChange = (value: string) => {
    onChange?.({
      target: { name: props.name, value: unmaskPhoneNumber(value) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <IMaskInput
      {...props}
      mask="000 - 000 - 0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={handleChange}
    />
  );
});

TextMaskPhoneNumber.displayName = "TextMaskPhoneNumber";

type PhoneNumberInputProps =
  | ({ error?: string; helperText?: string } & Omit<
      InputBaseProps,
      "error" | "name"
    >) &
      (
        | {
            label: string;
            name: string;
          }
        | {
            label?: undefined;
            name?: string;
          }
      );

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  name,
  error = "",
  helperText = "",
  ...props
}) => {
  const hasError = Boolean(error && error?.trim());
  return (
    <div className={classes.container} data-error={hasError}>
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
      <Paper component="div" className={classes.paper} elevation={0} dir="ltr">
        <Typography className={classes.countryCode}>+98</Typography>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          className={classes.input}
          placeholder="XXX - XXX - XXXX"
          type="tel"
          inputProps={{ "aria-label": "phone number" }}
          inputComponent={TextMaskPhoneNumber}
          name={name}
          {...props}
        />
      </Paper>

      {(hasError || !!helperText) && (
        <Typography
          variant="body2"
          component="div"
          className={classes.helperText}
        >
          {hasError ? error : helperText}
        </Typography>
      )}
    </div>
  );
};
