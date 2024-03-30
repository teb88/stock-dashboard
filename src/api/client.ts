import {useQuery} from '@tanstack/react-query';

import {DateRange, TimeInterval} from '../models/generic';
import {
  Exchange,
  Response,
  StockInfo,
  TimeSeriesResponse,
} from '../models/responses';
import {dateParser} from '../utils/time';
import {composeUrl} from './utils';

const API_BASE = 'https://api.twelvedata.com/';

const tempCache = new Map();

/**
 * Simple and naive api client only intended
 * to fulfill this challenge's requirements
 * (embrace YAGNI!)
 */
export async function doRequest<T>(config: {
  resource: 'stocks' | 'time_series' | 'exchanges';
  queryParams?: URLSearchParams;
  onError?: (err: Error) => void;
}): Promise<T | undefined> {
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
}

/**
 * Endpoint request takes no params,
 * response list is pretty much static
 * caching response is suggested
 */
export async function fetchMarketList(
  market?: string | null
): Promise<StockInfo[] | undefined> {
  const cacheKey = 'stocks__' + market;
  if (tempCache.has(cacheKey)) {
    console.log('using cache');
    return tempCache.get(cacheKey);
  }

  const queryParams: Record<string, string> = {};

  if (market && market !== 'Todos') {
    queryParams.exchange = market;
  }

  const response = await doRequest<Response<StockInfo>>({
    resource: 'stocks',
    queryParams: new URLSearchParams(queryParams),
  });

  const data = response?.data;

  if (data) {
    tempCache.set(cacheKey, data);
  }

  return data;
}

export async function fetchStockDetails(symbol: string) {
  const response = await doRequest<Response<StockInfo>>({
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

  if (!response?.values || response?.status === 'error') {
    throw new Error(response?.message);
  }

  return response.values || [];
}

export async function fetchExchangeList() {
  const response = await doRequest<Response<Exchange>>({
    resource: 'exchanges',
  });

  if (!response?.data) throw new Error();

  return response.data;
}

export const hook = {
  useMarketList: (market: string | null) => {
    return useQuery({
      queryKey: ['stocks', market],
      queryFn: () => fetchMarketList(market),
      staleTime: 30 * 60 * 1000, // 30 minutes
      enabled: !!market,
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
    range?: DateRange
  ) => {
    const start_date =
      range?.from || dateParser.toMMDDYYY(new Date().toString());
    const end_date = range?.to;

    const intervalMap = {
      [TimeInterval.interval1min]: 1 * 60 * 1000,
      [TimeInterval.interval5min]: 5 * 60 * 1000,
      [TimeInterval.interval15min]: 15 * 60 * 1000,
    };

    return useQuery({
      queryKey: ['time_series', symbol, interval, start_date, end_date],
      queryFn: async () => {
        if (!symbol) {
          return;
        }

        const queryParams: Record<string, string> = {
          symbol,
          interval,
        };

        if (start_date) {
          queryParams.start_date = start_date;
        }
        if (end_date) {
          queryParams.end_date = end_date;
        }

        return fetchTimeSeries(queryParams);
      },
      refetchInterval: end_date ? false : intervalMap[interval],
      staleTime: 30 * 60 * 1000, // 30 minutes
      retry: false,
    });
  },
  useExchanges: () => {
    return useQuery({
      queryKey: ['exchanges'],
      queryFn: fetchExchangeList,
      staleTime: 90 * 60 * 1000, // 90 minutes
    });
  },
};
