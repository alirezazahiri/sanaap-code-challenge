import { RadioGroup, RadioGroupProps } from "@/components/ui";
import { FormControl, FormLabel } from "@mui/material";
import { forwardRef } from "react";

type FormRadioGroupProps = RadioGroupProps & {
  label?: string;
  fullWidth?: boolean;
  className?: string;
};

export const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
  ({ options, labelId, name, direction = "row", label, fullWidth, className,  ...props }, ref) => {
    return (
      <FormControl fullWidth={fullWidth} className={className}>
        <FormLabel id={labelId}>{label}</FormLabel>
        <RadioGroup
          ref={ref}
          options={options}
          labelId={labelId}
          name={name}
          direction={direction}
          {...props}
        />
      </FormControl>
    );
  }
);
