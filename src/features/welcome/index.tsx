"use client";

import { Button, Typography } from "@/components/ui";
import classes from "./styles.module.css";
import Image from "next/image";
import { PATHS } from "@/routes/paths";

export const WelcomeFeature = () => {
  return (
    <div className={classes.container}>
      <Image
        src="/assets/images/logo.png"
        alt="company logo"
        height={62}
        width={47}
        className={classes.logo}
      />
      <div className={classes.content}>
        <Typography variant="body1" component="p">
          در صورت نصب اپلیکیشن ازطریق لینک دعوت، گزینه “ورود” را انتخاب نمایید.
        </Typography>
        <div className={classes.buttons}>
          <Button variant="contained" color="inherit" size="large" href="#">
            ورود
          </Button>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            href={PATHS.AUTH.SIGNUP.PHONE_VERIFICATION}
          >
            ثبت نام
          </Button>
        </div>
      </div>
    </div>
  );
};
