import MuiSelect, { type SelectChangeEvent } from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import { forwardRef } from "react";
import { InputAdornment } from "@mui/material";

export type SelectProps = {
  name?: string;
  options: { label: string; value: string | number | readonly string[] }[];
  labelId?: string;
  id?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (
    event: SelectChangeEvent<string | number | readonly string[]>
  ) => void;
  label?: string;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
  placeholder: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      name,
      defaultValue = 0,
      loading,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <MuiSelect
        name={name}
        ref={ref}
        disabled={loading || disabled}
        startAdornment={
          loading ? (
            <InputAdornment position="start">
              <CircularProgress size={20} />
            </InputAdornment>
          ) : null
        }
        defaultValue={defaultValue}
        {...props}
      >
        <MenuItem value={0} disabled>
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value.toString()} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    );
  }
);
Select.displayName = "Select";
