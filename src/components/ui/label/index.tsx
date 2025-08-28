import { Typography, type TypographyProps } from "@/components/ui/typography";

type LabelProps = Omit<TypographyProps, "component"> & {
  name: string;
  className?: string;
};

export const Label: React.FC<LabelProps> = ({ name, className, ...props }) => {
  return (
    <label htmlFor={name} className={className}>
      <Typography component="span" {...props} />
    </label>
  );
};
