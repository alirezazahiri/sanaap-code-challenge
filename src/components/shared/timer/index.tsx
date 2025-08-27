"use client";

import { Typography } from "@/components/ui";
import { secondsToMMSS } from "@/lib/utils";
import clsx from "clsx";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useEffect } from "react";
import classes from "./styles.module.css";

type TimerProps = {
  seconds: number;
  className?: string;
  onExpire?: () => void;
  expiredClassName?: string;
};

export type TimerRef = {
  reset: () => void;
};

// TODO: add a way to style the timer if it's expired
export const Timer = forwardRef<TimerRef, TimerProps>(
  ({ seconds, className, onExpire, expiredClassName }, ref) => {
    const [time, setTime] = useState(seconds);
    const isFinished = useRef(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (time === 0 && !isFinished.current) {
        isFinished.current = true;
        onExpire?.();
      }
    }, [time, onExpire]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setTime(seconds);
        isFinished.current = false;
      },
    }));

    return (
      <Typography
        variant="body2"
        component="p"
        className={clsx(
          classes.container,
          className,
          expiredClassName && time === 0 && expiredClassName
        )}
      >
        {secondsToMMSS(time)}
      </Typography>
    );
  }
);

Timer.displayName = "Timer";
