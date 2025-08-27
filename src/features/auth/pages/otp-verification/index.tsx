"use client";

import { Typography, IconButton } from "@/components/ui";
import { PencilIcon } from "@icons";
import { OtpVerificationForm } from "@/features/auth/components";
import { useRouter } from "next/navigation";
import { PATHS } from "@/routes/paths";
import classes from "./styles.module.css";

export const OtpVerificationFeature = ({ phone }: { phone: string }) => {
  const router = useRouter();
  const formattedPhone = phone.replace("0", "+98");

  const handleEditPhone = () => {
    router.push(PATHS.AUTH.SIGNUP.PHONE_VERIFICATION);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" component="h2" fontWeight={700}>
          کد تایید را وارد نمایید
        </Typography>
        <div className={classes.phone}>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            dir="ltr"
            fontSize={14}
            fontWeight={500}
          >
            {formattedPhone}
          </Typography>
          <IconButton
            size="small"
            color="primary"
            className={classes.editIcon}
            onClick={handleEditPhone}
          >
            <PencilIcon width={24} height={24} />
          </IconButton>
        </div>
      </div>
      <OtpVerificationForm />
    </div>
  );
};
