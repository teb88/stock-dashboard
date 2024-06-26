export interface StockInfo {
  symbol: string;
  name: string;
  currency: string;
  exhange: string;
  mic_code: string;
  country: string;
  type: string;
}

export interface Response<T> {
  data: T[];
  status: string;
}

export interface TimeSeriesItem {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export interface TimeSeriesResponse {
  message?: string;
  metadata: Record<string, string>;
  values?: TimeSeriesItem[];
  status: string;
}

export interface Exchange {
  name: string;
  code: string;
  country: string;
  timezone: string;
}
