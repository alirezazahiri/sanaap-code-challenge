type JwtAccessTokenPayload = {
  token_type: "access";
  exp: number;
  jti: string;
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  app_name: string;
  agency_id: number | null;
  agent_code: string | null;
  is_manager: boolean;
  insurance: string | null;
  role: string;
};

export type { JwtAccessTokenPayload };