import {
  fetchRosettaContext,
  fetchRosettaDataModels,
  fetchRosettaDataType,
  fetchRosettaLogin,
} from './fetch-from-rosetta';
import type {
  RosettaContextResponse,
  RosettaDataModelsQuery,
  RosettaDataModelsResponse,
  RosettaDataTypeResponse,
  RosettaLoginQuery,
} from './type';

export class Rosetta {
  private accessToken: string | null = null;
  private dataTypes: RosettaDataTypeResponse = [];
  private dataModels: RosettaDataModelsResponse = [];
  private context: RosettaContextResponse = [];

  async login(query: RosettaLoginQuery) {
    const { access_token } = await fetchRosettaLogin(query);
    this.accessToken = access_token;
  }

  async fetchDataType() {
    if (!this.accessToken) {
      throw new Error('Access token is not set');
    }
    const response = await fetchRosettaDataType(this.accessToken);
    this.dataTypes = response;
  }

  async fetchDataModels(query: RosettaDataModelsQuery) {
    if (!this.accessToken) {
      throw new Error('Access token is not set');
    }
    const response = await fetchRosettaDataModels(this.accessToken, query);
    this.dataModels = response;
  }

  async fetchContext() {
    if (!this.accessToken) {
      throw new Error('Access token is not set');
    }
    const response = await fetchRosettaContext(this.accessToken);
    this.context = response;
  }
}
