"use client";

import { useTheme } from "@mui/material";
import { Toaster as SonnerToaster } from "sonner";
import classes from "./styles.module.css";
import { DangerIcon } from "@/components/shared/icons";

export const Toaster = () => {
  const theme = useTheme();

  return (
    <SonnerToaster
      theme={theme.palette.mode}
      position="top-center"
      dir="rtl"
      richColors
      icons={{
        error: (
          <div className={classes.errorIcon}>
            <DangerIcon color="white" />,
          </div>
        ),
      }}
      toastOptions={{
        classNames: {
          toast: classes.toast,
          icon: classes.icon,
        },
      }}
      visibleToasts={1}
      swipeDirections={["left", "right"]}
    />
  );
};

export { toast } from "sonner";
