import { useMutation } from "@tanstack/react-query";
import { httpService } from "@/lib/http-service";
import { API_ENDPOINTS, ApiEndpointRequestBody } from "@/routes/api-endpoints";
import { ApiEndpointResponse } from "@/routes/api-endpoints";

type Op = "CHECK_AGENT_CODE";

const checkAgentCode = async (data: ApiEndpointRequestBody[Op]) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await httpService.post<ApiEndpointResponse[Op]>(
    API_ENDPOINTS.CHECK_AGENT_CODE,
    data
  );
  return response;
};

export const useCheckAgentCode = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["check-agent-code"],
    mutationFn: checkAgentCode,
  });

  return {
    mutate,
    isPending,
    error,
    isSuccess,
  };
};
