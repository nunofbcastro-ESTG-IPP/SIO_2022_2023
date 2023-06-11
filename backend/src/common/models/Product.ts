export interface Product {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export interface Attributes {
  item_code: string;
  item_description: string;
  sales_price: number;
  sales_price_includes_vat: boolean;
  tax_code: string;
  applied_tax_code: string;
  notes: string;
  is_merchandise: any;
  location_in_warehouse: any;
  sales_price_2: any;
  sales_price_3: any;
  purchase_price: number;
  ean_barcode: string;
  financial_cost: number;
  transport_cost: number;
  other_cost: number;
  customs_cost: number;
  estimated_total_cost: number;
  product_inventory_type: string;
  accounting_number: any;
  service_group: any;
  is_active: boolean;
  sales_price_vat_display: number;
  sales_price_2_vat_display: any;
  sales_price_3_vat_display: any;
  applied_tax_exemption_reason_id: any;
}

export interface Relationships {
  applied_tax_exemption_reason: AppliedTaxExemptionReason;
  company: Company;
  item_families: ItemFamilies;
  tax_exemption_reasons: TaxExemptionReasons;
  unit_of_measure: UnitOfMeasure;
}

export interface AppliedTaxExemptionReason {
  data: any;
}

export interface Company {
  data: CompanyData;
}

export interface CompanyData {
  type: string;
  id: string;
}

export interface ItemFamilies {
  data: ItemFamily;
}

export interface ItemFamily {
  type: string;
  id: string;
}

export interface TaxExemptionReasons {
  data: any;
}

export interface UnitOfMeasure {
  data: UnitOfMeasureData;
}

export interface UnitOfMeasureData {
  type: string;
  id: string;
}
