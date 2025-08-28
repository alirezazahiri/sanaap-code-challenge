import { useQuery } from "@tanstack/react-query";
import {
  API_ENDPOINTS,
  ApiEndpointRequestParams,
  ApiEndpointResponse,
} from "@/routes/api-endpoints";
import { GET } from "@/lib/http-service";
import { CountyModel } from "@/models";

type Op = "GET_COUNTIES";

const getCounties = async (params: ApiEndpointRequestParams[Op]) => {
  const searchParams = new URLSearchParams();
  searchParams.set("province", params.province.toString());
  const response = await GET<ApiEndpointResponse[Op]>(
    `${API_ENDPOINTS.GET_COUNTIES}?${searchParams.toString()}`
  );
  return response.map(CountyModel.generate);
};

export const useGetCounties = (params: ApiEndpointRequestParams[Op]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["counties", params.province],
    queryFn: () => getCounties(params),
    enabled: !!params.province,
  });

  return {
    data,
    isLoading,
    error,
  };
};
