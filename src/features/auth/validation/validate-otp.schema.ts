import { z } from "zod";
import { phoneNumberSchema } from "./phone-number.schema";

export const validateOtpSchema = z
  .object({
    code: z.string().min(1, "کد الزامی است"),
  })
  .extend(phoneNumberSchema.shape);

export type ValidateOtpSchema = z.infer<typeof validateOtpSchema>;
