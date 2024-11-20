import type {
  RosettaContextResponse,
  RosettaDataModelsQuery,
  RosettaDataModelsResponse,
  RosettaDataTypeResponse,
  RosettaLoginResponse,
} from './type';
import type { RosettaLoginQuery } from './type';

export const ROSETTA_API_BASE_URL =
  'https://rosetta.global.standardchartered.com:9991';

export const fetchRosettaLogin = async (
  query: RosettaLoginQuery,
): Promise<RosettaLoginResponse> => {
  const response = await fetch(`${ROSETTA_API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-fetch-dest': 'empty',
      username: query.username,
      password: query.password,
    },
  });
  return response.json();
};

export const fetchRosettaDataType = async (
  accessToken: string,
): Promise<RosettaDataTypeResponse> => {
  const response = await fetch(`${ROSETTA_API_BASE_URL}/api/DATATYPE/static`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export const fetchRosettaDataModels = async (
  accessToken: string,
  query: RosettaDataModelsQuery,
): Promise<RosettaDataModelsResponse> => {
  const response = await fetch(`${ROSETTA_API_BASE_URL}/api/dataModels`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(query),
  });
  return response.json();
};

export const fetchRosettaContext = async (
  accessToken: string,
): Promise<RosettaContextResponse> => {
  const response = await fetch(`${ROSETTA_API_BASE_URL}/api/context`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};
