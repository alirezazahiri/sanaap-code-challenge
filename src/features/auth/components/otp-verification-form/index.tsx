"use client";

import { PinInput, TimerRef } from "@/components/shared";
import { toast } from "@/components/feedback";
import { Button } from "@/components/ui";
import { useRef, useState } from "react";
import { Timer } from "@/components/shared";
import { useActionMutation } from "@/hooks";
import { createOtpAction, validateOtpAction } from "@/features/auth/actions";
import { PhoneNumberSchema } from "@/features/auth/validation";
import { useRouter } from "next/navigation";
import classes from "./styles.module.css";
import { PATHS } from "@/routes/paths";
import { RedoIcon } from "@icons";
import clsx from "clsx";

type OtpVerificationFormProps = {
  phone: string;
};

export const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  phone,
}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");
  const [isResendCodeDisabled, setIsResendCodeDisabled] = useState(true);
  const timerRef = useRef<TimerRef>(null);

  const { mutate: resendCode, isPending: isResendCodePending } =
    useActionMutation(createOtpAction, {
      onSuccess: () => {
        setIsResendCodeDisabled(true);
        timerRef.current?.reset();
      },
      onError: () => {
        toast.error("ارسال کد با خطا مواجه شد.");
      },
    });
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
  const handleOnExpire = () => {
    setIsResendCodeDisabled(false);
  };

  const handleValidateOtp = (value: string) => {
    validateOtp({ phone, code: value });
  };

  const handleOnComplete = (value: string) => {
    setCode(value);
  };

  const handleSubmitOtpCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleValidateOtp(code);
  };

  const handleResendOtpCode = () => {
    const formData = new FormData();
    formData.append("phone", phone);
    resendCode(formData);
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

      <div className={classes.resendCode}>
        <Button
          variant="text"
          size="small"
          disabled={isResendCodeDisabled}
          onClick={handleResendOtpCode}
          endIcon={
            <RedoIcon
              width={16}
              height={16}
              className={clsx(classes.redoIcon, {
                [classes.disabled]: isResendCodeDisabled,
                [classes.loading]: isResendCodePending,
              })}
            />
          }
        >
          ارسال مجدد کد
        </Button>
        <Timer
          seconds={5}
          onExpire={handleOnExpire}
          ref={timerRef}
          expiredClassName={classes.expired}
        />
      </div>
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
