"use client";

import { PhoneNumberInput } from "@/components/shared";
import { Control, Controller } from "react-hook-form";
import { AgencyInfoSchema } from "@/features/auth/validation";
import { unmaskPhoneNumber } from "@/lib/phone-number";

type PhoneFieldProps = {
  control: Control<AgencyInfoSchema>;
  error?: string;
  onPhoneChange: (value: string) => void;
};

export const PhoneField: React.FC<PhoneFieldProps> = ({
  control,
  error,
  onPhoneChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const unmaskedValue = unmaskPhoneNumber(e.target.value);
    onPhoneChange(unmaskedValue);
  };

  return (
    <Controller<AgencyInfoSchema, "telephone">
      name="telephone"
      control={control}
      render={({ field }) => (
        <PhoneNumberInput
          prefix="021"
          mask="0000 - 0000"
          label="تلفن ثابت"
          name={field.name}
          onChange={handleChange}
          error={error}
        />
      )}
    />
  );
};
