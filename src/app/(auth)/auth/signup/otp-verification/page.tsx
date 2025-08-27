import { OtpVerificationFeature } from "@/features/auth/pages";
import { PATHS } from "@/routes/paths";
import { redirect } from "next/navigation";

const OtpVerificationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ phone: string }>;
}) => {
  const { phone } = await searchParams;
  
  if (!phone) {
    return redirect(PATHS.AUTH.SIGNUP.PHONE_VERIFICATION);
  }

  return <OtpVerificationFeature phone={phone} />;
};

export default OtpVerificationPage;
