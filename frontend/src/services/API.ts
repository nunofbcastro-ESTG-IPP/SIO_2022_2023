import axios from 'axios';
import { TypeRequest } from '@/models/TypeRequest';

export function configuration(
  typeRequest: TypeRequest = TypeRequest.JSON,
  authorizationHeader?: string
): {} {
  let config: any = {};

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
  timeout: number = 5000,
  params?: any,
  authorizationHeader?: string
) {
  return axios.create({
    baseURL: baseURL,
    timeout: timeout,
    headers: configuration(typeRequest, authorizationHeader),
    params: params,
  });
}
