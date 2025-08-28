import { UserInfoFeature } from "@/features/auth/pages";
import { phoneNumberSchema } from "@/features/auth/validation";
import { PATHS } from "@/routes/paths";
import { redirect } from "next/navigation";

type UserInfoPageProps = {
  searchParams: Promise<{ phone: string }>;
};

const UserInfoPage: React.FC<UserInfoPageProps> = async ({ searchParams }) => {
  const { phone } = await searchParams;

  const result = await phoneNumberSchema.safeParseAsync({ phone });

  if (!result.success) {
    return redirect(PATHS.AUTH.SIGNUP.PHONE_VERIFICATION);
  }

  return <UserInfoFeature phone={phone} />;
};

export default UserInfoPage;
