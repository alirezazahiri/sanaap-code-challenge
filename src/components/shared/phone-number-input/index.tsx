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
  mask: string;
}
const TextMaskPhoneNumber = forwardRef<
  HTMLInputElement,
  TextMaskPhoneNumberProps
>(({ onChange, mask, ...props }, ref) => {
  const handleChange = (value: string) => {
    onChange?.({
      target: { name: props.name, value: unmaskPhoneNumber(value) },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <IMaskInput
      {...props}
      mask={mask}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={handleChange}
    />
  );
});

TextMaskPhoneNumber.displayName = "TextMaskPhoneNumber";

type BaseProps = {
  error?: string;
  helperText?: string;
  mask?: string;
  prefix?: string;
} & Omit<InputBaseProps, "error" | "name">;

type PhoneNumberInputProps =
  | BaseProps &
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
  mask = "000 - 000 - 0000",
  prefix = "+98",
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
        <Typography className={classes.countryCode}>{prefix}</Typography>
        <Divider className={classes.divider} orientation="vertical" />
        <InputBase
          data-mask={mask}
          className={classes.input}
          placeholder={mask.replace(/0/g, "X")}
          type="tel"
          inputProps={{ "aria-label": "phone number" }}
          inputComponent={(props) => (
            <TextMaskPhoneNumber {...props} mask={mask} />
          )}
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
