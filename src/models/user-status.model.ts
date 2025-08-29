import { InsuranceCode } from "@/enums/insurance-code.enum";
import { RegistrationStatus } from "@/enums/registration-status.enum";
import { Role } from "@/enums/role.enum";

export interface ApiUserStatus {
  personal_info?: {
    id: number;
    phone_number: string;
    first_name: string;
    last_name: string;
  };
  agency_info?: {
    id: number;
    insurance: {
      id: number;
      name: string;
      code: InsuranceCode;
    };
    agent_code: number;
    role: Role;
    has_location: boolean;
    confirm_location: boolean;
    address: string;
    address_detail: string;
  };
  registration_status: RegistrationStatus;
  map_info?: {
    link: string;
  };
}

export interface UserStatus {
  personalInfo?: {
    id: number;
    phoneNumber: string;
    firstName: string;
    lastName: string;
  };
  agencyInfo?: {
    id: number;
    insurance: {
      id: number;
      name: string;
      code: InsuranceCode;
    };
    agentCode: number;
    role: Role;
    hasLocation: boolean;
    confirmLocation: boolean;
    address: string;
    addressDetail: string;
  };
  registrationStatus: RegistrationStatus;
  mapInfo?: {
    link: string;
  };
}

export class UserStatusModel {
  static generate(data: ApiUserStatus): UserStatus {
    return {
      personalInfo: data.personal_info
        ? {
            id: data.personal_info.id,
            phoneNumber: data.personal_info.phone_number,
            firstName: data.personal_info.first_name,
            lastName: data.personal_info.last_name,
          }
        : undefined,
      agencyInfo: data.agency_info
        ? {
            id: data.agency_info.id,
            insurance: {
              id: data.agency_info.insurance.id,
              name: data.agency_info.insurance.name,
              code: data.agency_info.insurance.code,
            },
            agentCode: data.agency_info.agent_code,
            role: data.agency_info.role,
            hasLocation: data.agency_info.has_location,
            confirmLocation: data.agency_info.confirm_location,
            address: data.agency_info.address,
            addressDetail: data.agency_info.address_detail,
          }
        : undefined,
      registrationStatus: data.registration_status,
      mapInfo: data.map_info
        ? {
            link: data.map_info.link,
          }
        : undefined,
    };
  }
}
