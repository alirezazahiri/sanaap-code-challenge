"use client";

import { FormSelect } from "@/components/shared";
import {
  AgencyInfoFieldErrors,
  AgencyInfoFormRegister,
} from "@/features/auth/types";
import { County, InsuranceBranch, Province } from "@/models";

type LocationFieldsProps = {
  register: AgencyInfoFormRegister;
  errors: AgencyInfoFieldErrors;
  selectedProvince: number;
  provinces: Province[];
  counties: County[];
  insuranceBranches: InsuranceBranch[];
};

export const LocationFields: React.FC<LocationFieldsProps> = ({
  register,
  errors,
  selectedProvince,
  provinces,
  counties,
  insuranceBranches,
}) => {
  const provincesOptions = provinces.map((province) => ({
    label: province.name,
    value: province.id,
  }));
  const countiesOptions = counties.map((county) => ({
    label: county.name,
    value: county.id,
  }));

  const insuranceBranchesOptions = insuranceBranches.map((branch) => ({
    label: branch.name,
    value: branch.id,
  }));

  return (
    <>
      <FormSelect
        placeholder="استان را انتخاب کنید"
        {...register("province")}
        options={provincesOptions}
        error={errors.province?.message}
        label="استان"
        fullWidth
      />
      <FormSelect
        placeholder="شهر را انتخاب کنید"
        {...register("city", { disabled: !selectedProvince })}
        options={countiesOptions}
        error={errors.city?.message}
        label="شهر"
        fullWidth
      />
      <FormSelect
        placeholder="شعبه بیمه‌گر را انتخاب کنید"
        {...register("insuranceBranch", { disabled: !selectedProvince })}
        options={insuranceBranchesOptions}
        error={errors.insuranceBranch?.message}
        label="شعبه بیمه‌گر"
        fullWidth
      />
    </>
  );
};
