import { Typography } from "@/components/ui";

type AgencyInfoFormProps = {
  phone: string;
  firstName: string;
  lastName: string;
};

export const AgencyInfoForm: React.FC<AgencyInfoFormProps> = ({
  phone,
  firstName,
  lastName,
}) => {
  return (
    <Typography>
      AgencyInfoForm {phone} {firstName} {lastName}
    </Typography>
  );
};
