export const API_ENDPOINTS = {
  CREATE_OTP: "/agent/verification/signup/create_otp/",
  VALIDATE_OTP: "/agent/verification/signup/validate_otp/",
} as const;

export type ApiEndpointRequestBody = {
  CREATE_OTP: { phone_number: string };
  VALIDATE_OTP: { phone_number: string; code: string };
};

export type ApiEndpointResponse = {
  CREATE_OTP: "OK" | null;
  VALIDATE_OTP: "OK" | null;
};
