export interface Address {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  is_primary: boolean;
  address_detail?: string;
  city?: string;
  postcode?: string;
  region: any;
  name: string;
  for_discharge: boolean;
  for_charge: boolean;
  subtype?: string;
  is_saturday_workday: boolean;
  is_sunday_workday: boolean;
  is_national_holidays_workday: boolean;
  code?: string;
  payroll_enumerations_tax_office_id: any;
}

export interface Relationships {
  company: Company;
  country: Country;
  customer: Customer;
  supplier: Supplier;
  user: User;
}

export interface Company {
  data?: CompanyData;
}

export interface CompanyData {
  type: string;
  id: string;
}

export interface Country {
  data: CountryData;
}

export interface CountryData {
  type: string;
  id: string;
}

export interface Customer {
  data?: CustomerData;
}

export interface CustomerData {
  type: string;
  id: string;
}

export interface Supplier {
  data?: SupplierData;
}

export interface SupplierData {
  type: string;
  id: string;
}

export interface User {
  data?: UserData;
}

export interface UserData {
  type: string;
  id: string;
}
