export interface Supplier {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  tax_registration_number: string;
  business_name: string;
  website: string;
  is_taxable: boolean;
  is_tax_exempt: boolean;
  self_billing: any;
  document_series_id: any;
  internal_observations: string;
  tax_country_region: string;
  is_independent_worker: boolean;
  country_iso_alpha_2: string;
  saft_import_id: any;
}

export interface Relationships {
  addresses: Addresses;
  bank_accounts: BankAccounts;
  company: Company;
  contacts: Contacts;
  defaults: Defaults;
  main_address: MainAddress;
  main_contact: MainContact;
  tax_exemption_reason: TaxExemptionReason;
}

export interface Addresses {
  data: Address[];
}

export interface Address {
  type: string;
  id: string;
}

export interface BankAccounts {
  data: BankAccount[];
}

export interface BankAccount {
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

export interface Contacts {
  data: Contact[];
}

export interface Contact {
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

export interface MainAddress {
  data: MainAddressData;
}

export interface MainAddressData {
  type: string;
  id: string;
}

export interface MainContact {
  data: MainContactData;
}

export interface MainContactData {
  type: string;
  id: string;
}

export interface TaxExemptionReason {
  data: any;
}
