"use server";

import { envelopeServerAction } from "@/lib/server-action";
import {
  type ValidateOtpSchema,
  validateOtpSchema,
} from "@/features/auth/validation";
import { POST } from "@/lib/http-service";
import { Action } from "@/types/action";
import {
  API_ENDPOINTS,
  ApiEndpointRequestBody,
  ApiEndpointResponse,
} from "@/routes/api-endpoints";

type ActionState = { phone: string };

export const validateOtpAction: Action<ActionState, ValidateOtpSchema> = async (
  _model,
  data
) => {
  type Op = "VALIDATE_OTP";

  const { phone, code } = data;

  return await envelopeServerAction(async () => {
    const validatedResult = validateOtpSchema.safeParse({ phone, code });

    if (!validatedResult.success) {
      throw new Error(validatedResult.error.message);
    }

    await POST<ApiEndpointRequestBody[Op], ApiEndpointResponse[Op]>(
      API_ENDPOINTS.VALIDATE_OTP,
      {
        phone_number: phone,
        code: code,
      }
    );

    return {
      phone,
    };
  });
};
