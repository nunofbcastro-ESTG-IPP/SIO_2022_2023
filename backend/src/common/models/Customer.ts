export interface Customer {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  tax_registration_number: string;
  business_name: string;
  contact_name?: string;
  website?: string;
  phone_number?: string;
  mobile_number?: string;
  email?: string;
  observations?: string;
  internal_observations?: string;
  not_final_customer: boolean;
  cashed_vat: boolean;
  tax_country_region: string;
  country_iso_alpha_2: string;
  saft_import_id: any;
  is_tax_exempt: boolean;
  //data: Data;
}

export interface Relationships {
  addresses: Addresses;
  company: Company;
  defaults: Defaults;
  email_addresses: EmailAddresses;
  main_address: MainAddress;
  main_email_address: MainEmailAddress;
  //tax_exemption_reason: TaxExemptionReason;
}

export interface Addresses {
  data: Address[];
}

export interface Address {
  type: string;
  id: string;
}

export interface Company {
  data: CompanyData;
}

export interface CompanyData {
  type: string;
  id: string;
}

export interface Defaults {
  data: DefaultsData;
}

export interface DefaultsData {
  type: string;
  id: string;
}

export interface EmailAddresses {
  data: EmailAddress[];
}

export interface EmailAddress {
  type: string;
  id: string;
}

export interface MainAddress {
  data: MainAddressData;
}

export interface MainAddressData {
  type: string;
  id: string;
}

export interface MainEmailAddress {
  data?: MainEmailAddressData;
}

export interface MainEmailAddressData {
  type: string;
  id: string;
}
