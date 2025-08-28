import { UserInfoForm } from "@/features/auth/components";

type UserInfoFeatureProps = {
  phone: string;
};

export const UserInfoFeature: React.FC<UserInfoFeatureProps> = ({ phone }) => {
  return <UserInfoForm phone={phone} />;
};
