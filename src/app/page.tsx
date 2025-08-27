import { PATHS } from "@/routes/paths";
import { redirect } from "next/navigation";

const Page = () => {
  redirect(PATHS.AUTH.SIGNUP.PHONE_VERIFICATION);
  return null;
};

export default Page;
