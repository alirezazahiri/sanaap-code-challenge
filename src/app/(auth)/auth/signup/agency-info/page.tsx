import { AgencyInfoFeature } from "@/features/auth/pages";
import { userInfoSchema } from "@/features/auth/validation";
import { PATHS } from "@/routes/paths";
import { redirect } from "next/navigation";

type AgencyInfoPageProps = {
  searchParams: Promise<{ firstName: string; lastName: string }>;
};

const AgencyInfoPage: React.FC<AgencyInfoPageProps> = async ({
  searchParams,
}) => {
  const { firstName, lastName } = await searchParams;

  const result = await userInfoSchema.safeParseAsync({
    firstName,
    lastName,
  });

  if (!result.success) {
    return redirect(PATHS.AUTH.SIGNUP.USER_INFO);
  }

  return <AgencyInfoFeature />;
};

export default AgencyInfoPage;
