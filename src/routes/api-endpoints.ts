import { AgencyType } from "@/enums/agency-type.enum";
import { ApiInsuranceBranch, ApiCounty, ApiProvince } from "@/models";
import { ApiUserStatus } from "@/models/user-status.model";
import { ApiResponse } from "@/types/api";

export const API_ENDPOINTS = {
  CREATE_OTP: "/api/v2/app/DEY/agent/verification/signup/create_otp/",
  VALIDATE_OTP: "/api/v2/app/DEY/agent/verification/signup/validate_otp/",
  GET_PROVINCES: "/base/provinces_wop/",
  GET_COUNTIES: "/base/counties_wop/",
  GET_INSURANCE_BRANCHES:
    "/api/v2/app/selection_item/insurance_branch/wop_list/",
  CHECK_AGENT_CODE:
    "/api/v2/app/DEY/agent/verification/signup/check_agency_code/",
  SIGNUP: "/api/v2/app/DEY/agent/verification/signup/",
  CHECK_USER_STATUS: "/api/v2/app/DEY/agent/app_user_status/",
} as const;

export type ApiEndpointRequestBody = {
  CREATE_OTP: { phone_number: string };
  VALIDATE_OTP: { phone_number: string; code: string };
  CHECK_AGENT_CODE: { agent_code: string };
  SIGNUP: {
    first_name: string;
    last_name: string;
    phone_number: string;
    agent_code: string;
    province: number;
    county: number;
    insurance_branch: number;
    city_code: string;
    phone: string;
    agency_type: AgencyType;
    name: string | null;
  };
};

export type ApiEndpointRequestParams = {
  GET_COUNTIES: { province: number };
  GET_INSURANCE_BRANCHES: {
    name?: string;
    insurance?: string;
    province: number;
  };
  CHECK_USER_STATUS: { access: string };
};

export type ApiEndpointResponse = {
  CREATE_OTP: "OK" | null;
  VALIDATE_OTP: "OK" | null;
  GET_PROVINCES: ApiProvince[];
  GET_COUNTIES: ApiCounty[];
  GET_INSURANCE_BRANCHES: ApiResponse<ApiInsuranceBranch[]>;
  CHECK_AGENT_CODE: "OK" | null;
  SIGNUP: ApiResponse<{ refresh: string; access: string }>;
  CHECK_USER_STATUS: ApiResponse<ApiUserStatus>;
};
