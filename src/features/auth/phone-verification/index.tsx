import { PhoneNumberInput } from "@/components/shared";
import { Button, Typography } from "@/components/ui";
import classes from "./styles.module.css";

export const PhoneVerificationFeature = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography variant="h6" component="h2" fontWeight={700}>
          شماره موبایل خود را وارد نمایید
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          کد تایید برای شما ارسال خواهد شد.
        </Typography>
      </div>
      <form>
        <PhoneNumberInput name="phone-number" label="شماره موبایل" />
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          className={classes.continueButton}
        >
          ادامه
        </Button>
      </form>
    </div>
  );
};
