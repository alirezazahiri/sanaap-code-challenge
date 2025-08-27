"use client";

import { PhoneNumberInput } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  PhoneNumberSchema,
  phoneNumberSchema,
} from "@/features/auth/validation";
import classes from "./styles.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PATHS } from "@/routes/paths";

export const PhoneVerificationForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumberSchema>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phone: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: PhoneNumberSchema) => {
    router.push(`${PATHS.AUTH.SIGNUP.OTP_VERIFICATION}?phone=${data.phone}`);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <PhoneNumberInput
        label="شماره موبایل"
        {...register("phone")}
        error={errors.phone?.message}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        type="submit"
      >
        ادامه
      </Button>
    </form>
  );
};
