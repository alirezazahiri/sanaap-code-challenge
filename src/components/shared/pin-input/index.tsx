"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { PinInputProps, PinInputRef } from "./types";
import classes from "./styles.module.css";
import clsx from "clsx";
import { TextField } from "@mui/material";

export const PinInput = forwardRef<PinInputRef, PinInputProps>(
  (
    {
      autoFocus = true,
      length = 5,
      onChange,
      onComplete,
      className,
      color,
      disabled,
      placeholder,
      error,
    },
    ref
  ) => {
    if (length < 1) throw new Error("PinInput length must be greater than 0");

    const inputsRef = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
      if (autoFocus && inputsRef.current[0]) {
        inputsRef.current[0].focus();
      }
    }, [autoFocus]);

    const sendResult = useCallback(() => {
      const result = inputsRef.current.map((input) => input.value).join("");
      onChange?.(result);
      if (result.length === length) onComplete?.(result);
    }, [length, onChange, onComplete]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target,
        target: { value },
      } = e;
      const index = parseInt(target.dataset.index || "0", 10);

      if (!/^[0-9]$/.test(value)) {
        target.value = "";
      } else if (inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
      }

      sendResult();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key, target } = e;
      const input = target as HTMLInputElement;
      const index = parseInt(input.dataset.index || "0", 10);

      if (key === "Backspace") {
        if (input.value === "" && inputsRef.current[index - 1]) {
          inputsRef.current[index - 1].value = "";
          inputsRef.current[index - 1].focus();
        } else {
          input.value = "";
        }
        sendResult();
      } else if (key === "ArrowLeft" && inputsRef.current[index - 1]) {
        e.preventDefault();
        inputsRef.current[index - 1].focus();
      } else if (key === "ArrowRight" && inputsRef.current[index + 1]) {
        e.preventDefault();
        inputsRef.current[index + 1].focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pastedCode = e.clipboardData.getData("text");

      if (/^[0-9]+$/.test(pastedCode)) {
        const digits = pastedCode.split("").slice(0, length);
        digits.forEach((digit, i) => {
          if (inputsRef.current[i]) inputsRef.current[i].value = digit;
        });
        inputsRef.current[Math.min(digits.length - 1, length - 1)]?.focus();
        sendResult();
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        focus: () => inputsRef.current[0]?.focus(),
        clear: () => {
          inputsRef.current.forEach((input) => (input.value = ""));
          inputsRef.current[0]?.focus();
          sendResult();
        },
      }),
      [sendResult]
    );

    return (
      <div className={classes.container}>
        {Array.from({ length }, (_, i) => (
          <TextField
            key={i}
            type="tel"
            color={color}
            disabled={disabled}
            placeholder={placeholder}
            className={clsx(classes.textField, error && classes.error)}
            slotProps={{
              htmlInput: {
                "data-index": i,
                maxLength: 1,
                className: clsx(classes.item, className),
                ref: (el: HTMLInputElement) => {
                  if (el) inputsRef.current[i] = el;
                },
                onChange: handleChange,
                onFocus: (e: React.FocusEvent<HTMLInputElement>) =>
                  e.target.select(),
                onKeyDown: handleKeyDown,
                onPaste: handlePaste,
              },
            }}
          />
        ))}
      </div>
    );
  }
);

PinInput.displayName = "PinInputComponent";
