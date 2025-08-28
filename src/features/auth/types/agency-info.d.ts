import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AgencyInfoSchema } from "@/features/auth/validation";

export type AgencyInfoFormRegister = UseFormRegister<AgencyInfoSchema>;
export type AgencyInfoFieldErrors = FieldErrors<AgencyInfoSchema>;
