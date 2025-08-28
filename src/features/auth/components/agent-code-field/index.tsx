"use client";

import { FormTextInput } from "@/components/shared";
import { debounce } from "@/lib/utils";
import { CheckCircleIcon } from "@/components/shared/icons";
import { AgencyInfoFormRegister } from "@/features/auth/types";
import classes from "./styles.module.css";

type AgentCodeFieldProps = {
  register: AgencyInfoFormRegister;
  error?: string;
  onValidate: (code: string) => void;
  isValidating: boolean;
  isValid: boolean;
};

export const AgentCodeField: React.FC<AgentCodeFieldProps> = ({
  register,
  error,
  onValidate,
  isValidating,
  isValid,
}) => {
  const handleChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onValidate(e.target.value);
  }, 500);

  return (
    <FormTextInput
      placeholder="کد نمایندگی را وارد کنید"
      label="کد نمایندگی"
      {...register("agentCode", { onChange: handleChange })}
      error={error}
      loading={isValidating}
      endAdornment={
        isValid && (
          <CheckCircleIcon
            width={20}
            height={20}
            className={classes.checkIcon}
          />
        )
      }
      dir="ltr"
      fullWidth
    />
  );
};
