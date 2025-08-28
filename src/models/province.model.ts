
export interface ApiProvince {
  id: number;
  is_active: boolean;
  name: string;
  code: string;
  name_split: string;
  creator_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
  country: number;
}

export interface Province {
  id: number;
  isActive: boolean;
  name: string;
  code: string;
  nameSplit: string;
  creatorUser: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
  country: number;
}
export class ProvinceModel {
  static generate(data: ApiProvince): Province {
    return {
      id: data.id,
      code: data.code,
      name: data.name,
      nameSplit: data.name_split,
      isActive: data.is_active,
      creatorUser: {
        id: data.creator_user.id,
        firstName: data.creator_user.first_name,
        lastName: data.creator_user.last_name,
        username: data.creator_user.username,
      },
      country: data.country,
    };
  }
}
