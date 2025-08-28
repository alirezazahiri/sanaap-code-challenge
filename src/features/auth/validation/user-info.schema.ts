import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;
