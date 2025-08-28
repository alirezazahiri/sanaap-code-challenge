import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import MuiRadioGroup from "@mui/material/RadioGroup";
import { forwardRef } from "react";

export type RadioGroupProps = {
  options: { label: string; value: string | number | readonly string[] }[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelId?: string;
  name?: string;
  defaultValue?: string;
  direction?: "row" | "column";
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      onChange,
      labelId,
      name,
      defaultValue,
      direction = "row",
    },
    ref
  ) => {
    return (
      <MuiRadioGroup
        row={direction === "row"}
        aria-labelledby={labelId}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        ref={ref}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value.toString()}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </MuiRadioGroup>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
