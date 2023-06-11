import { TypeRequest } from '@/models/TypeRequest';
import { MyAPI } from '@/services/MyAPI';

export async function getMostSoldProducts(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/products/rank-group-profit`, {
      params: { initDate: initDate, finalDate: finalDate, sort: 'most' },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function getCostsAndSales(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/sales/cost-and-sales`, {
      params: { initDate: initDate, finalDate: finalDate },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function getMetrics(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/sales/metrics`, {
      params: { initDate: initDate, finalDate: finalDate },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function getLastSales(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/sales/last-sales`, {
      params: { initDate: initDate, finalDate: finalDate },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function getMetricsSupplier(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/suppliers/metrics`, {
      params: { initDate: initDate, finalDate: finalDate },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function upload(selectedFile: File) {
  const formData = new FormData();
  formData.append('file', selectedFile);

  return await MyAPI(TypeRequest.FORM, 3600000).post('/parser-saft', formData);
}

export async function getBestClients(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/clients/rank-clients`, {
      params: { initDate: initDate, finalDate: finalDate, sort: 'most' },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}

export async function getBestSuppliers(
  initDate: string = `${new Date().getFullYear()}-01-01`,
  finalDate: string = `${new Date().getFullYear()}-12-31`
) {
  return MyAPI()
    .get(`/suppliers/rank-suppliers`, {
      params: { initDate: initDate, finalDate: finalDate, sort: 'most' },
    })
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
}
