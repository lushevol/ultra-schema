type LoginWithAccountPayload = {
  username: string;
  password: string;
};

type LoginWithSSOPayload = {
  code: string;
  iss: string;
  client_id: string;
};

export type LoginPayload = LoginWithAccountPayload | LoginWithSSOPayload;

export type LoginResponse = {
  entities: {
    id: number;
    name: string;
    applicationName: string;
    roleId: number;
    roleName: string;
    subjects: {
      id: number;
      name: string;
      longName: string;
      actions: {
        id: number;
        name: string;
        entitlementId: number;
      }[];
    }[];
  }[];
  entitlementsToken: string | null;
  errorMessage: string | null;
  expiration: string | null;
  oud: string | null;
  result: boolean;
  userInfo: string | null;
};
