import { Supplier } from '@/common/models/Supplier';
import { TOConlineAPI } from '../TOConlineAPI';

import { Family } from '@/common/models/Family';
import { Customer } from '@/common/models/Customer';
import { Purchase } from '@/common/models/Purchase';
import { Payment } from '@/common/models/Payment';
import { Product } from '@/common/models/Product';
import { Address } from '@/common/models/Address';

const customers = 'api/customers';
const suppliers = 'api/suppliers';
const purchases = 'api/v1/commercial_purchases_documents';
const payments = 'api/v1/commercial_purchases_payments/';
const products = 'api/products';
const families = 'api/item_families';
const addresses = 'api/addresses';

export async function getAllCustomers(): Promise<Customer[]> {
  const result = await (await TOConlineAPI()).get(customers);
  return result.data.data;
}

export async function getAllSuppliers(): Promise<Supplier[]> {
  const result = await (await TOConlineAPI()).get(suppliers);
  return result.data.data;
}

export async function getAllPurchases(): Promise<Purchase[]> {
  const result = await (await TOConlineAPI()).get(purchases);
  return result.data;
}

export async function getAllPayments(): Promise<Payment[]> {
  const result = await (await TOConlineAPI()).get(payments);
  return result.data;
}

export async function getAllProducts(): Promise<Product[]> {
  const result = await (await TOConlineAPI()).get(products);
  return result.data.data;
}

export async function getAllFamilies(): Promise<Family[]> {
  const result = await (await TOConlineAPI()).get(families);
  return result.data.data;
}

export async function getAddresses(): Promise<Address[]> {
  const result = await (await TOConlineAPI()).get(addresses);
  return result.data.data;
}
