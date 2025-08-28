"use server";

import { envelopeServerAction } from "@/lib/server-action";
import {
  type PhoneNumberSchema,
  phoneNumberSchema,
} from "@/features/auth/validation";
import { POST } from "@/lib/http-service";
import { Action } from "@/types/action";
import {
  API_ENDPOINTS,
  ApiEndpointRequestBody,
  ApiEndpointResponse,
} from "@/routes/api-endpoints";

export const validateOtpAction: Action<
  PhoneNumberSchema,
  { phone: string; code: string }
> = async (_model, data) => {
  type Op = "VALIDATE_OTP";

  const { phone, code } = data;

  return await envelopeServerAction(async () => {
    const validatedResult = phoneNumberSchema.safeParse({ phone });

    if (!validatedResult.success) {
      throw new Error(validatedResult.error.message);
    }

    await POST<
      ApiEndpointRequestBody[Op],
      ApiEndpointResponse[Op]
    >(API_ENDPOINTS.VALIDATE_OTP, {
      phone_number: phone,
      code: code,
    });

    return {
      phone,
    };
  });
};
