"use client";

import { createOtpAction } from "@/features/auth/actions";
import { PhoneNumberInput } from "@/components/shared";
import { Button } from "@/components/ui";
import {
  PhoneNumberSchema,
  phoneNumberSchema,
} from "@/features/auth/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PATHS } from "@/routes/paths";
import { useActionMutation } from "@/hooks";
import classes from "./styles.module.css";

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

  const { mutate, isPending } = useActionMutation(createOtpAction, {
    onSuccess: (data) => {
      if (data.success) {
        router.push(
          `${PATHS.AUTH.SIGNUP.OTP_VERIFICATION}?phone=${data.response!.phone}`
        );
      }
    },
    onError: (error) => {
      // TODO: toast error
      console.log(error);
    },
  });

  const onSubmit = (data: PhoneNumberSchema) => {
    const formData = new FormData();
    formData.append("phone", data.phone.padStart(11, "0"));
    mutate(formData);
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
        type="submit"
        loading={isPending}
        fullWidth
      >
        ادامه
      </Button>
    </form>
  );
};
