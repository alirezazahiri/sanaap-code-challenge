"use server";

import { signUpSchema, SignUpSchema } from "@/features/auth/validation";
import { POST } from "@/lib/http-service";
import { envelopeServerAction } from "@/lib/server-action";
import { setSession } from "@/lib/set-session";
import {
  API_ENDPOINTS,
  ApiEndpointRequestBody,
  ApiEndpointResponse,
} from "@/routes/api-endpoints";
import { Action } from "@/types/action";

type ActionState = {
  accessToken: string;
  refreshToken: string;
};

export const signUpAction: Action<ActionState, SignUpSchema> = async (
  _model,
  data
) => {
  type Op = "SIGNUP";

  return await envelopeServerAction(async () => {
    const agencyName = data.agencyName?.trim() ?? null;
    const validatedResult = signUpSchema.safeParse({
      ...data,
      agencyName,
    });

    if (!validatedResult.success) {
      throw new Error(validatedResult.error.message);
    }

    const requestBody: ApiEndpointRequestBody[Op] = {
      first_name: validatedResult.data.firstName,
      last_name: validatedResult.data.lastName,
      phone_number: validatedResult.data.phone,
      agent_code: validatedResult.data.agentCode,
      province: validatedResult.data.province,
      county: validatedResult.data.city,
      insurance_branch: validatedResult.data.insuranceBranch,
      city_code: "021",
      phone: validatedResult.data.telephone,
      agency_type: validatedResult.data.agencyType,
      name: !validatedResult.data.agencyName
        ? null
        : validatedResult.data.agencyName,
    };

    const { response } = await POST<
      ApiEndpointRequestBody[Op],
      ApiEndpointResponse[Op]
    >(API_ENDPOINTS.SIGNUP, requestBody);

    await setSession(response.access, response.refresh);

    return {
      accessToken: response.access,
      refreshToken: response.refresh,
    };
  });
};
