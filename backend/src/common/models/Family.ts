export interface Family {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  name: string;
}

export interface Relationships {
  company: Company;
}

export interface Company {
  data: CompanyData;
}

export interface CompanyData {
  type: string;
  id: string;
}
