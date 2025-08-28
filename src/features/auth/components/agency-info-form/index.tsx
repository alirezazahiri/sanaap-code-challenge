"use client";

import {
  FormRadioGroup,
  FormSelect,
  FormTextInput,
  PhoneNumberInput,
} from "@/components/shared";
import { Button } from "@/components/ui";
import { AgencyType } from "@/enums/agency-type.enum";
import classes from "./styles.module.css";
import {
  useGetCounties,
  useGetInsuranceBranches,
  useGetProvinces,
} from "@/features/auth/api";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { agencyInfoSchema, AgencyInfoSchema } from "@/features/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { unmaskPhoneNumber } from "@/lib/phone-number";

type AgencyInfoFormProps = {
  phone: string;
  firstName: string;
  lastName: string;
};

export const AgencyInfoForm: React.FC<AgencyInfoFormProps> = ({
  phone,
  firstName,
  lastName,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(agencyInfoSchema),
    defaultValues: {
      agentCode: "",
      province: 0,
      city: 0,
      insuranceBranch: 0,
      cityCode: "",
      telephone: "",
      agencyType: AgencyType.REAL,
      agencyName: "",
    },
    mode: "onChange",
  });

  const province = watch("province");

  const { data: provinces = [] } = useGetProvinces();
  const provincesOptions = [...provinces].map((province) => ({
    label: province.name,
    value: province.id,
  }));

  const { data: counties = [] } = useGetCounties({ province });
  const countiesOptions = [...counties].map((county) => ({
    label: county.name,
    value: county.id,
  }));

  const { data: insuranceBranches = [] } = useGetInsuranceBranches({
    province,
  });
  const insuranceBranchesOptions = [...insuranceBranches].map((branch) => ({
    label: branch.name,
    value: branch.id,
  }));

  const agencyTypeOptions = [
    { label: "حقیقی", value: AgencyType.REAL },
    { label: "حقوقی", value: AgencyType.LEGAL },
  ];

  const onSubmit = (data: AgencyInfoSchema) => {
    console.log(data);
  };

  const handleChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<AgencyInfoSchema, "telephone">
  ) => {
    const unmaskedValue = unmaskPhoneNumber(e.target.value);
    field.onChange({
      target: { name: field.name, value: unmaskedValue },
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: API call to check if the agent code is valid */}
      <FormTextInput
        placeholder="کد نمایندگی را وارد کنید"
        label="کد نمایندگی"
        {...register("agentCode")}
        error={errors.agentCode?.message}
        dir="ltr"
        fullWidth
      />
      <FormSelect
        placeholder="استان را انتخاب کنید"
        {...register("province")}
        options={provincesOptions}
        error={errors.province?.message}
        label="استان"
        defaultValue={0}
        fullWidth
      />
      <FormSelect
        placeholder="شهر را انتخاب کنید"
        {...register("city", {
          disabled: !province,
        })}
        options={countiesOptions}
        error={errors.city?.message}
        label="شهر"
        defaultValue={0}
        fullWidth
      />

      {/* TODO: this should be an autocomplete input  */}
      <FormSelect
        placeholder="شعبه بیمه‌گر را انتخاب کنید"
        {...register("insuranceBranch", {
          disabled: !province,
        })}
        options={insuranceBranchesOptions}
        error={errors.insuranceBranch?.message}
        label="شعبه بیمه‌گر"
        fullWidth
        defaultValue={0}
      />

      {/* TODO: prefix and mask should be dynamic based on the province */}
      <Controller
        name="telephone"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <PhoneNumberInput
              prefix="021"
              mask="0000 - 0000"
              label="تلفن ثابت"
              name={field.name}
              onChange={(e) => handleChangePhoneNumber(e, field)}
              error={error?.message}
            />
          );
        }}
      />

      <FormRadioGroup
        label="نوع نمایندگی"
        {...register("agencyType")}
        className={classes.formRadioGroup}
        options={agencyTypeOptions}
        defaultValue={AgencyType.REAL}
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        ادامه
      </Button>
    </form>
  );
};
