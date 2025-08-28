import MuiSelect, { type SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { forwardRef } from "react";

export type SelectProps = {
  name?: string;
  options: { label: string; value: string }[];
  labelId?: string;
  id?: string;
  value?: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  label?: string;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, name, ...props }, ref) => {
    return (
      <MuiSelect
        name={name}
        ref={ref}
        disabled={props.loading || props.disabled}
        startAdornment={props.loading ? <CircularProgress size={20} /> : null}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    );
  }
);
Select.displayName = "Select";
