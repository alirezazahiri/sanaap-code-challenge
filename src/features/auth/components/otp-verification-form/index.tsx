"use client";

import { PinInput, TimerRef } from "@/components/shared";
import classes from "./styles.module.css";
import { Button } from "@/components/ui";
import { useRef, useState } from "react";
import { Timer } from "@/components/shared";

export const OtpVerificationForm = () => {
  const [error, setError] = useState(false);
  const [isResendCodeDisabled, setIsResendCodeDisabled] = useState(true);
  const timerRef = useRef<TimerRef>(null);

  const handleOnExpire = () => {
    setIsResendCodeDisabled(false);
  };

  const handleResendCode = () => {
    timerRef.current?.reset();
    setIsResendCodeDisabled(true);
  };

  return (
    <form className={classes.form}>
      <PinInput
        color="primary"
        length={5}
        onChange={() => {}}
        error={error}
        onComplete={() => setError(true)}
      />

      <div className={classes.resendCode}>
        <Button
          variant="text"
          size="small"
          disabled={isResendCodeDisabled}
          onClick={handleResendCode}
        >
          ارسال مجدد کد
        </Button>
        <Timer seconds={5} onExpire={handleOnExpire} ref={timerRef} />
      </div>
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
