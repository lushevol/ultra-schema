export type ImUsingBody = {
  keys: string[];
};

export type ImUsingResponse = {
  [key: string]: {
    userId: string;
    timestamp: number;
  }[];
};

export type WhoIsUsingQuery = {
  key: string;
};

export type WhoIsUsingResponse = {
  users: string[];
};
