import {useQuery} from '@tanstack/react-query';
import {StockInfo, StockResponse} from '../models/responses';
import {composeUrl} from './utils';

const API_BASE = 'https://api.twelvedata.com/';

const tempCache = new Map();

/**
 * Simple and naive api client only intended
 * to fulfill this challenge's requirements
 * (embrace YAGNI!)
 */
export async function doRequest(config: {
  resource: 'stocks' | 'time_series';
  queryParams?: URLSearchParams;
  onError?: (err: Error) => void;
}) {
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

    const jsonData: StockResponse = await response.json();
    return jsonData.data;
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
export async function fetchMarketList(): Promise<StockInfo[] | undefined> {
  const cacheKey = 'stocks';
  if (tempCache.has(cacheKey)) {
    console.log('using cache');
    return tempCache.get(cacheKey);
  }

  const data = await doRequest({resource: 'stocks'});

  if (data) {
    tempCache.set(cacheKey, data);
  }

  return data;
}

export const hook = {
  useMarketList: () => {
    return useQuery({
      queryKey: ['stocks'],
      queryFn: fetchMarketList,
      staleTime: 30 * 60 * 1000, // 30 minutes
    });
  },
};
