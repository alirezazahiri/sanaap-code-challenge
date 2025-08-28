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

export const createOtpAction: Action<PhoneNumberSchema> = async (
  _model,
  formData
) => {
  type Op = "CREATE_OTP";

  const phone = formData.get("phone") as string;

  return await envelopeServerAction(async () => {
    const validatedResult = phoneNumberSchema.safeParse({ phone });

    if (!validatedResult.success) {
      throw new Error(validatedResult.error.message);
    }

    await POST<
      ApiEndpointRequestBody[Op],
      ApiEndpointResponse[Op]
    >(API_ENDPOINTS.CREATE_OTP, {
      phone_number: phone,
    });

    return {
      phone,
    };
  });
};
