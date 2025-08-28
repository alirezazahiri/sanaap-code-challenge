import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS, ApiEndpointResponse } from "@/routes/api-endpoints";
import { GET } from "@/lib/http-service";
import { ProvinceModel } from "@/models";
import { queryClient } from "@/lib/react-query";

type Op = "GET_PROVINCES";

const getProvinces = async () => {
  const response = await GET<ApiEndpointResponse[Op]>(
    API_ENDPOINTS.GET_PROVINCES
  );
  return response.map(ProvinceModel.generate);
};

export const prefetchProvinces = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["provinces"],
    queryFn: () => getProvinces(),
  });
};

export const useGetProvinces = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["provinces"],
    queryFn: () => getProvinces(),
  });

  return {
    data,
    isLoading,
    error,
  };
};
