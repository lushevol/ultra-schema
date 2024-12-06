export type UserInfo = {
  id: number;
  name: string;
  fullName: string;
  userId: string;
  oud: string;
  entitlements: {
    [subjectWithRole: string]: {
      [applicationName: string]: string[];
    };
  };
};
