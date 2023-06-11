import { TypeRequest } from '@/common/models/TypeRequest';
import axios from 'axios';

export function configuration(
  typeRequest: TypeRequest = TypeRequest.JSON,
  authorizationHeader?: string,
) {
  const config: any = {};

  config['Access-Control-Allow-Origin'] = '*';
  config['Content-type'] = typeRequest;

  if (authorizationHeader) {
    config.Authorization = authorizationHeader;
  }
  return config;
}

export function API(
  typeRequest: TypeRequest = TypeRequest.JSON,
  baseURL: string,
  params?: any,
  authorizationHeader?: string,
) {
  return axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: configuration(typeRequest, authorizationHeader),
    params: params,
  });
}
