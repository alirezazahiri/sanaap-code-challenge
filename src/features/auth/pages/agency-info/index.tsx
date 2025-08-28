import { AgencyInfoForm } from "@/features/auth/components";

type AgencyInfoFeatureProps = {
  phone: string;
  firstName: string;
  lastName: string;
};

export const AgencyInfoFeature: React.FC<AgencyInfoFeatureProps> = ({
  phone,
  firstName,
  lastName,
}) => {
  return (
    <AgencyInfoForm phone={phone} firstName={firstName} lastName={lastName} />
  );
};
