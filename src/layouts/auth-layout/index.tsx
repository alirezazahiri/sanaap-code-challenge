import Image from "next/image";
import { Paper } from "@/components/ui";
import classes from "./styles.module.css";

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.hero}>
        <Image
          src="/assets/images/logo.png"
          alt="company logo"
          height={62}
          width={47}
          className={classes.logo}
        />

        <Paper className={classes.paper} elevation={6}>
          {children}
        </Paper>
      </div>
    </div>
  );
};

export default AuthLayout;
