"use client";

import { PinInput } from "@/components/shared";
import { toast } from "@/components/feedback";
import { Button } from "@/components/ui";
import { useState } from "react";
import { useActionMutation } from "@/hooks";
import { validateOtpAction } from "@/features/auth/actions";
import { OtpResendCode } from "@/features/auth/components/otp-resend-code";
import { PhoneNumberSchema } from "@/features/auth/validation";
import { useRouter } from "next/navigation";
import classes from "./styles.module.css";
import { PATHS } from "@/routes/paths";

type OtpVerificationFormProps = {
  phone: string;
};

export const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  phone,
}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");

  const { mutate: validateOtp, isPending: isValidateOtpPending } =
    useActionMutation<PhoneNumberSchema, { phone: string; code: string }>(
      validateOtpAction,
      {
        onSuccess: () => {
          router.push(PATHS.AUTH.SIGNUP.USER_INFO);
        },
        onError: () => {
          setError(true);
          toast.error("کد وارد شده صحیح نمی باشد.");
        },
      }
    );

  const handleOnComplete = (value: string) => {
    setCode(value);
  };

  const handleSubmitOtpCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateOtp({ phone, code });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitOtpCode}>
      <PinInput
        color="primary"
        length={5}
        onChange={() => {}}
        error={error}
        onComplete={handleOnComplete}
      />

      <OtpResendCode phone={phone} />

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
        disabled={code.length !== 5}
        loading={isValidateOtpPending}
      >
        ادامه
      </Button>
    </form>
  );
};
