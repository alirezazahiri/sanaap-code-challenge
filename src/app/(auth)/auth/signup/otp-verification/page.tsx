import { OtpVerificationFeature } from "@/features/auth/pages";
import { phoneNumberSchema } from "@/features/auth/validation";
import { PATHS } from "@/routes/paths";
import { redirect } from "next/navigation";

type OtpVerificationPageProps = {
  searchParams: Promise<{ phone: string }>;
};

const OtpVerificationPage: React.FC<OtpVerificationPageProps> = async ({
  searchParams,
}) => {
  const { phone = "" } = await searchParams;

  const result = await phoneNumberSchema.safeParseAsync({
    phone: phone.slice(1),
  });

  if (!result.success) {
    return redirect(PATHS.AUTH.SIGNUP.PHONE_VERIFICATION);
  }

  return <OtpVerificationFeature phone={phone} />;
};

export default OtpVerificationPage;
