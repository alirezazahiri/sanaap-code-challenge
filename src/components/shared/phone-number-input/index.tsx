"use client";

import { IMaskInput } from "react-imask";
import { forwardRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase, {
  type InputBaseComponentProps,
} from "@mui/material/InputBase";
import { Divider, Typography } from "@/components/ui";
import classes from "./styles.module.css";

interface TextMaskPhoneNumberProps extends InputBaseComponentProps {
  name: string;
}
const TextMaskPhoneNumber = forwardRef<
  HTMLInputElement,
  TextMaskPhoneNumberProps
>(({ onChange, ...props }, ref) => {
  const handleChange = (value: string) => {
    console.log(value);
    onChange?.({
      target: { name: props.name, value },
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
      overwrite
      unmask
    />
  );
});

TextMaskPhoneNumber.displayName = "TextMaskPhoneNumber";

interface PhoneNumberInputProps {
  label?: string;
  name: string;
}
export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  name,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={name} className={classes.label}>
          <Typography variant="body2" component="span" color="textPrimary">
            {label}
          </Typography>
        </label>
      )}
      <Paper component="div" className={classes.paper} elevation={0} dir="ltr">
        <Typography color="textDisabled" className={classes.countryCode}>
          +98
        </Typography>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          className={classes.input}
          placeholder="XXX - XXX - XXXX"
          inputProps={{ "aria-label": "phone number" }}
          inputComponent={TextMaskPhoneNumber}
          name={name}
        />
      </Paper>
    </>
  );
};
