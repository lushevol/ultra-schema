export type RosettaLoginQuery = {
  username: string;
  password: string;
};

export type RosettaLoginResponse = {
  access_token: string;
};

export type RosettaDataTypeResponse = {
  id: number;
  staticType: string;
  code: string;
  value: string;
  createdBy: string;
  modifiedBy: string;
  createdDate: string;
}[];

export type RosettaDataModelsQuery = {
  dataMoelType: string;
  fieldName: string;
  context: string;
};

export type RosettaDataModelsResponse = {
  id: number;
  dataModelType: string;
  fieldName: string;
  context: string;
}[];

export type RosettaContextResponse = {
  id: number;
  code: string;
  description: string;
  name: string;
  ownerId: string;
  createdBy: string;
  createdDate: string;
  modifiedBy: string;
  modifiedDate: string;
}[];
