import { useSession } from "@/hooks/use-session";
import { GET } from "@/lib/http-service";
import {
  API_ENDPOINTS,
  ApiEndpointRequestParams,
  ApiEndpointResponse,
} from "@/routes/api-endpoints";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestHeaders } from "axios";

type Op = "CHECK_USER_STATUS";

const getUserStatus = async (params: ApiEndpointRequestParams[Op]) => {
  const { response } = await GET<ApiEndpointResponse[Op]>(
    API_ENDPOINTS.CHECK_USER_STATUS,
    {
      Authorization: `jwt ${params.access}`,
    } as AxiosRequestHeaders
  );
  return response;
};

export const useUserStatus = () => {
  const { data: session } = useSession();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-status"],
    queryFn: () => getUserStatus({ access: session?.accessToken || "" }),
    enabled: !!session,
  });

  return {
    isLoading,
    isError,
    data,
  };
};
