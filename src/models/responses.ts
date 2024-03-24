export interface StockInfo {
  symbol: string;
  name: string;
  currency: string;
  exhange: string;
  mic_code: string;
  country: string;
  type: string;
}

export interface StockResponse {
  data: StockInfo[];
  status: string;
}
