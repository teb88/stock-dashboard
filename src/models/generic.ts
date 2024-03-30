export enum TimeInterval {
  interval1min = '1min',
  interval5min = '5min',
  interval15min = '15min',
}

export interface DateRange {
  from: string;
  to: string;
}

export interface HeaderDetails {
  currencies: string[];
  countries: string[];
  names: string[];
  types: string[];
}
