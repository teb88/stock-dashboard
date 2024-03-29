export enum TimeInterval {
  interval1min = '1min',
  interval5min = '5min',
  interval15min = '15min',
}

export enum ChartDisplayMode {
  RealTime,
  DateRange,
}

export interface DateRange {
  from: string;
  to: string;
}
