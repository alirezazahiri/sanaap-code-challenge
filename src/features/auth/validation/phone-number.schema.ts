import { PHONE_NUMBER_REGEX } from "@/constants/regex";
import { z } from "zod";

export const phoneNumberSchema = z.object({
  phone: z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(PHONE_NUMBER_REGEX, "شماره موبایل معتبر نیست"),
});

export type PhoneNumberSchema = z.infer<typeof phoneNumberSchema>;
