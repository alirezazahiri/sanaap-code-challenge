import { z } from "zod";
import { agencyInfoSchema } from "./agency-info.schema";
import { phoneNumberSchema } from "./phone-number.schema";
import { userInfoSchema } from "./user-info.schema";

export const signUpSchema = agencyInfoSchema
  .safeExtend(userInfoSchema.shape)
  .safeExtend(phoneNumberSchema.shape);

export type SignUpSchema = z.infer<typeof signUpSchema>;
