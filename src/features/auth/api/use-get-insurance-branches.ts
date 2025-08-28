import { GET } from "@/lib/http-service";
import { InsuranceBranchModel } from "@/models/insurance-branch.model";
import {
  API_ENDPOINTS,
  ApiEndpointRequestParams,
  ApiEndpointResponse,
} from "@/routes/api-endpoints";
import { useQuery } from "@tanstack/react-query";

type Op = "GET_INSURANCE_BRANCHES";

const getInsuranceBranches = async (params: ApiEndpointRequestParams[Op]) => {
  const { insurance, province, name } = params;
  const queryParams = new URLSearchParams();
  if (insurance) queryParams.append("insurance", insurance);
  if (province) queryParams.append("province", province.toString());
  if (name) queryParams.append("name", name);

  const { response = [] } = await GET<ApiEndpointResponse[Op]>(
    `${API_ENDPOINTS.GET_INSURANCE_BRANCHES}?${queryParams.toString()}`
  );

  return response.map(InsuranceBranchModel.generate);
};

export const useGetInsuranceBranches = (
  params: ApiEndpointRequestParams[Op]
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      "insurance-branches",
      params.province,
      params.insurance,
      params.name,
    ],
    queryFn: () => getInsuranceBranches(params),
    enabled: !!params.province,
  });

  return {
    data,
    isLoading,
    error,
  };
};
