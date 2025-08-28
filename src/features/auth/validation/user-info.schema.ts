import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است").max(100, "نام نمیتواند بیشتر از 100 کاراکتر باشد"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است").max(100, "نام خانوادگی نمیتواند بیشتر از 100 کاراکتر باشد"),
});

export type UserInfoSchema = z.infer<typeof userInfoSchema>;
