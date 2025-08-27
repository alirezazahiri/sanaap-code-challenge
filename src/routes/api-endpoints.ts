export const API_ENDPOINTS = {
  CREATE_OTP: "/agent/verification/signup/create_otp/",
} as const;

export type ApiEndpointRequestBody = {
  CREATE_OTP: { phone_number: string }
};

export type ApiEndpointResponse = {
  CREATE_OTP: "OK" | null
};
