"use client";

import { TimerRef } from "@/components/shared";
import { toast } from "@/components/feedback";
import { Button } from "@/components/ui";
import { useRef, useState } from "react";
import { Timer } from "@/components/shared";
import { useActionMutation } from "@/hooks";
import { createOtpAction } from "@/features/auth/actions";
import classes from "./styles.module.css";
import { RedoIcon } from "@icons";
import clsx from "clsx";

interface OtpResendCodeProps {
  phone: string;
}

export const OtpResendCode: React.FC<OtpResendCodeProps> = ({ phone }) => {
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

  const [isResendCodeDisabled, setIsResendCodeDisabled] = useState(true);
  const timerRef = useRef<TimerRef>(null);

  const handleOnExpire = () => {
    setIsResendCodeDisabled(false);
  };

  const handleResendOtpCode = () => {
    if (isResendCodeDisabled) return;
    const formData = new FormData();
    formData.append("phone", phone);
    resendCode(formData);
  };

  return (
    <div className={classes.container}>
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
  );
};
