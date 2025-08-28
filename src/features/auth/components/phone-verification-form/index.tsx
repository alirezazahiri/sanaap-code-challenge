"use client";

import { createOtpAction } from "@/features/auth/actions";
import { PhoneNumberInput } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  PhoneNumberSchema,
  phoneNumberSchema,
} from "@/features/auth/validation";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PATHS } from "@/routes/paths";
import { useActionMutation } from "@/hooks";
import classes from "./styles.module.css";
import { toast } from "@/components/feedback";
import { unmaskPhoneNumber } from "@/lib/phone-number";

export const PhoneVerificationForm = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<PhoneNumberSchema>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phone: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useActionMutation(createOtpAction, {
    onSuccess: (data) => {
      if (data.success) {
        router.push(
          `${PATHS.AUTH.SIGNUP.OTP_VERIFICATION}?phone=${data.response!.phone}`
        );
      }
    },
    onError: () => {
      toast.error("ارسال کد با خطا مواجه شد.");
    },
  });

  // !FIXME: this is a workaround to fix the issue with the phone number input in Safari Mobile
  // TODO: find a better solution for this issue
  const handleChangePhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<PhoneNumberSchema, "phone">
  ) => {
    const unmaskedValue = unmaskPhoneNumber(e.target.value);
    field.onChange({
      target: { name: field.name, value: unmaskedValue },
    });
  };

  const onSubmit = (data: PhoneNumberSchema) => {
    const formData = new FormData();
    formData.append("phone", data.phone.padStart(11, "0"));
    mutate(formData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller<PhoneNumberSchema>
        name="phone"
        control={control}
        render={({ field, fieldState: { error } }) => {
          return (
            <PhoneNumberInput
              label="شماره موبایل"
              name={field.name}
              onChange={(e) => handleChangePhoneNumber(e, field)}
              error={error?.message}
            />
          );
        }}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        loading={isPending}
        fullWidth
      >
        ادامه
      </Button>
    </form>
  );
};
