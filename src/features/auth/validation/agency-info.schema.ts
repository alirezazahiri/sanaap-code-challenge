import { AgencyType } from "@/enums/agency-type.enum";
import { z } from "zod";

export const agencyInfoSchema = z
  .object({
    agentCode: z
      .string()
      .min(1, "کد نمایندگی را وارد کنید")
      .max(10, "کد نمایندگی نمیتواند بیشتر از 10 رقم باشد"),
    province: z.number().min(1, "استان را انتخاب کنید"),
    city: z.number().min(1, "شهر را انتخاب کنید"),
    insuranceBranch: z.number().min(1, "شعبه بیمه‌گر را انتخاب کنید"),
    telephone: z
      .string()
      .min(1, "تلفن ثابت نمایندگی را وارد کنید")
      .max(10, "تلفن ثابت نمایندگی نمیتواند بیشتر از 10 رقم باشد"),
    agencyType: z.enum(AgencyType),
    // if and only if type is AgencyType.LEGAL, agencyName is required
    agencyName: z
      .string()
      .trim()
      .min(1, "نام نمایندگی را وارد کنید")
      .max(100, "نام نمایندگی نمیتواند بیشتر از 100 کاراکتر باشد")
      .nullable()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      const name = data.agencyName?.trim();
      if (data.agencyType === AgencyType.LEGAL) {
        return !!name;
      }
      return true;
    },
    {
      message: "نام نمایندگی را وارد کنید",
      path: ["agencyName"],
    }
  );

export type AgencyInfoSchema = z.infer<typeof agencyInfoSchema>;
