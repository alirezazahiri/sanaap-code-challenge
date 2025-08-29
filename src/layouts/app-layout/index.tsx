import Image from "next/image";
import classes from "./styles.module.css";

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Image
        src="/assets/vectors/circles-1.svg"
        alt="circles-1"
        height={750}
        width={895}
        className={classes.circles1}
      />
      <Image
        src="/assets/vectors/circles-2.svg"
        alt="circles-2"
        height={658}
        width={366}
        className={classes.circles2}
      />
      {children}
    </div>
  );
};
