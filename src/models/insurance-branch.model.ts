export interface ApiInsuranceBranch {
  id: number;
  name: string;
  insurance: number;
  province: number;
  county: number;
}

export type InsuranceBranch = ApiInsuranceBranch;

export class InsuranceBranchModel {
  static generate(data: ApiInsuranceBranch): InsuranceBranch {
    return data;
  }
}
