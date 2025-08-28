"use client";

import { FormRadioGroup } from "@/components/shared";
import { AgencyType } from "@/enums/agency-type.enum";
import classes from "./styles.module.css";
import { AgencyInfoFormRegister } from "@/features/auth/types";

export const AgencyTypeField: React.FC<{
  register: AgencyInfoFormRegister;
  selectedType: AgencyType;
  onTypeChange: (type: AgencyType) => void;
}> = ({ register, selectedType, onTypeChange }) => {
  const agencyTypeOptions = [
    { label: "حقیقی", value: AgencyType.REAL },
    { label: "حقوقی", value: AgencyType.LEGAL },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTypeChange(e.target.value as AgencyType);
  };

  return (
    <FormRadioGroup
      label="نوع نمایندگی"
      {...register("agencyType", { onChange: handleChange })}
      className={classes.formRadioGroup}
      options={agencyTypeOptions}
      defaultValue={AgencyType.REAL}
      fullWidth
    />
  );
};
