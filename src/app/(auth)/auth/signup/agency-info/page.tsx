import { AgencyInfoFeature } from "@/features/auth/pages";
import { phoneNumberSchema, userInfoSchema } from "@/features/auth/validation";
import { PATHS } from "@/routes/paths";
import { redirect } from "next/navigation";

type AgencyInfoPageProps = {
  searchParams: Promise<{ firstName: string; lastName: string; phone: string }>;
};

const AgencyInfoPage: React.FC<AgencyInfoPageProps> = async ({
  searchParams,
}) => {
  const { firstName, lastName, phone } = await searchParams;

  const schema = userInfoSchema.extend(phoneNumberSchema.shape);

  const result = await schema.safeParseAsync({
    firstName,
    lastName,
    phone,
  });

  if (!result.success) {
    return redirect(PATHS.AUTH.SIGNUP.USER_INFO);
  }

  return (
    <AgencyInfoFeature
      phone={phone}
      firstName={firstName}
      lastName={lastName}
    />
  );
};

export default AgencyInfoPage;
