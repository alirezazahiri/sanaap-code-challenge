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
  return (
    <form className={classes.form}>
      <FormTextInput fullWidth label="کد نمایندگی" name="agencyCode" />
      <FormSelect name="province" options={[]} fullWidth label="استان" />
      <FormSelect name="city" options={[]} fullWidth label="شهر" />
      <FormSelect name="branch" options={[]} fullWidth label="شعبه بیمه‌گر" />
      <PhoneNumberInput
        prefix="021"
        mask="0000 - 0000"
        label="تلفن ثابت"
        name="telephone"
      />
      <FormRadioGroup
        className={classes.formRadioGroup}
        fullWidth
        label="نوع نمایندگی"
        options={[
          { label: "حقیقی", value: AgencyType.REAL },
          { label: "حقوقی", value: AgencyType.LEGAL },
        ]}
        defaultValue={AgencyType.REAL}
        onChange={() => {}}
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
