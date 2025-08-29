"use client";

import { Button, Drawer, Typography } from "@/components/ui";
import { useUserStatus } from "./api/use-user-status";
import { RegistrationStatus } from "@/enums/registration-status.enum";
import classes from "./styles.module.css";

export const UserStatusFeature = () => {
  const { data, isLoading, isError } = useUserStatus();

  return (
    <Drawer
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          sx: {
            maxWidth: "430px",
            marginInline: "auto",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            padding: "24px 16px",
          },
        },
      }}
      anchor="bottom"
      open
    >
      <div className={classes.content}>
        {!isLoading && !isError && data?.registration_status && (
          <Typography component="p" variant="body1">
            نماینده محترم:
          </Typography>
        )}
        {data?.registration_status ===
          RegistrationStatus.WAITING_FOR_CONFIRMATION && (
          <>
            <Typography component="p" variant="body1">
              درخواست ثبت نام شما در حال بررسی است. در صورت تایید اطلاعات،
              اپلیکیشن مورد نظر فعال خواهد شد.
            </Typography>
          </>
        )}
        {data?.registration_status === RegistrationStatus.REJECTED && (
          <>
            <Typography component="p" variant="body1">
              درخواست ثبت نام شما رد شده است.
            </Typography>
          </>
        )}
        <Button variant="contained" color="primary" href="#">
          ورود با حساب کاربری دیگر
        </Button>
      </div>
    </Drawer>
  );
};
