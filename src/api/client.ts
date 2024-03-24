import {useQuery} from '@tanstack/react-query';

import {TimeInterval} from '../models/generic';
import {
  StockInfo,
  StockResponse,
  TimeSeriesResponse,
} from '../models/responses';
import {composeUrl} from './utils';

const API_BASE = 'https://api.twelvedata.com/';

const tempCache = new Map();

/**
 * Simple and naive api client only intended
 * to fulfill this challenge's requirements
 * (embrace YAGNI!)
 */
export async function doRequest<T>(config: {
  resource: 'stocks' | 'time_series';
  queryParams?: URLSearchParams;
  onError?: (err: Error) => void;
}): Promise<T | undefined> {
  try {
    const apiKey = import.meta.env.VITE_TWELVE_API_KEY;

    const url = composeUrl(API_BASE, config);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${apiKey}`,
      },
    });

    if (!response.ok) throw new Error('Request did not succeed');

    return await response.json();
  } catch (error) {
    config.onError?.(error as Error);
    console.error(error);
  }
}

/**
 * Endpoint request takes no params,
 * response list is pretty much static
 * caching response is suggested
 */
export async function fetchMarketList(
  market: string
): Promise<StockInfo[] | undefined> {
  const cacheKey = 'stocks';
  if (tempCache.has(cacheKey)) {
    console.log('using cache');
    return tempCache.get(cacheKey);
  }

  const response = await doRequest<StockResponse>({
    resource: 'stocks',
    queryParams: new URLSearchParams({exchange: market}),
  });

  const data = response?.data;

  if (data) {
    tempCache.set(cacheKey, data);
  }

  return data;
}

export async function fetchStockDetails(symbol: string) {
  const response = await doRequest<StockResponse>({
    resource: 'stocks',
    queryParams: new URLSearchParams({symbol}),
  });

  return response?.data;
}

export async function fetchTimeSeries(queryParams: Record<string, string>) {
  const response = await doRequest<TimeSeriesResponse>({
    resource: 'time_series',
    queryParams: new URLSearchParams(queryParams),
  });

  return response?.values;
}

export const hook = {
  useMarketList: (market: string = 'NYSE') => {
    return useQuery({
      queryKey: ['stocks', market],
      queryFn: () => fetchMarketList(market),
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  },
  useStockDetails: (symbol?: string) => {
    return useQuery({
      queryKey: ['stocks', 'details', symbol],
      queryFn: async () => {
        if (symbol) {
          const data = await fetchStockDetails(symbol);
          return data?.[0];
        }
      },
      staleTime: 30 * 60 * 1000, // 30 minutes
      enabled: !!symbol,
    });
  },
  useTimeSeries: (
    symbol: string | undefined,
    interval: TimeInterval,
    range?: [string, string]
  ) => {
    const start_date = range?.[0];
    const end_date = range?.[1];

    return useQuery({
      queryKey: ['time_series', symbol, interval, start_date, end_date],
      queryFn: async () => {
        if (!symbol) {
          return;
        }

        const queryParams: Record<string, string> = {symbol, interval};

        if (start_date) {
          queryParams.start_date = start_date;
        }
        if (end_date) {
          queryParams.end_date = end_date;
        }

        const data = await fetchTimeSeries(queryParams);

        return data;
      },
    });
  },
};
