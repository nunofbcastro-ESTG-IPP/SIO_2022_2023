import { TypeRequest } from '@/models/TypeRequest';
import { API } from '@/services/API';
import { isServerSide } from './Utils';

export function MyAPI(
  typeRequest: TypeRequest = TypeRequest.JSON,
  timeout: number = 5000
) {
  const baseURL = `${
    isServerSide() ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL
  }api/`;

  return API(typeRequest, baseURL, timeout);
}
