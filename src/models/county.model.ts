import { Province, ProvinceModel } from "./province.model";

export interface ApiCounty {
  id: number;
  is_active: boolean;
  name: string;
  fanavaran_code: string;
  name_split: string;
  province: {
    id: number;
    is_active: boolean;
    name: string;
    code: string;
    name_split: string;
    creator_user: number;
    country: number;
  };
  creator_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
}

export interface County {
  id: number;
  isActive: boolean;
  name: string;
  fanavaranCode: string;
  nameSplit: string;
  province: Province;
  creatorUser: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
}

export class CountyModel {
  static generate(data: ApiCounty): County {
    return {
      id: data.id,
      isActive: data.is_active,
      name: data.name,
      fanavaranCode: data.fanavaran_code,
      nameSplit: data.name_split,
      province: ProvinceModel.generate({
        ...data.province,
        creator_user: {
          ...data.creator_user,
          id: data.province.creator_user,
        },
      }),
      creatorUser: {
        id: data.creator_user.id,
        firstName: data.creator_user.first_name,
        lastName: data.creator_user.last_name,
        username: data.creator_user.username,
      },
    };
  }
}
