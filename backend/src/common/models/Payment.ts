export interface Payment {
  date: string;
  document_no: string;
  document_series_id: number;
  payment_mechanism: string;
  gross_total: number;
  net_total: number;
  third_party_type: any;
  third_party_id: any;
  check_number: any;
  currency_conversion_rate: number;
  internal_observations?: string;
  observations?: string;
  standalone: boolean;
  deleted: boolean;
  id: number;
  cash_account_id?: number;
  company_id: number;
  country_id: number;
  currency_id: number;
  supplier_id: number;
  user_id: number;
  lines: Line[];
  bank_account_id?: number;
}

export interface Line {
  payment_id: number;
  payable_type: string;
  payable_id: number;
  paid_value: number;
  settlement_percentage: number;
  cashed_vat_amount: any;
  gross_total: number;
  settlement_amount: number;
  net_total: number;
  retention_total: number;
  id: number;
}
