// import { AgencyInfoForm } from "@/features/auth/components";

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
  return <div>AgencyInfoFeature {firstName} {lastName} {phone}</div>;
  // return <AgencyInfoForm phone={phone} />;
};
