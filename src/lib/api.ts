import { StudioAddClass } from '@/lib/types';

interface FetcherInput {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: Record<string, unknown>;
  json?: boolean;
}

/* eslint-disable consistent-return */
export const fetcher = async ({
  url, method, body, json = true,
}: FetcherInput) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('API error');
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

// Would like to refactor to a get method, requires more research on Fetch API
export const getLocations = (studioID: string) => fetcher({ url: '/api/fetch-studio-locs', method: 'post', body: { studioID } });

export const addClass = (classData: StudioAddClass) => fetcher({ url: '/api/add-class', method: 'post', body: classData });

export const getClassPopularity = (classID: string) => fetcher({ url: '/api/fetch-class-popularity', method: 'post', body: { classID } });

export const getStudioClasses = (studioID: string) => fetcher({ url: '/api/fetch-studio-classes', method: 'post', body: { studioID } });

export const getClassesByDate = (studioID: string, startDate: string, endDate: string) => fetcher({ url: '/api/fetch-classes-by-date', method: 'post', body: { studioID, startDate, endDate } });

export const updateRating = (classID: number, rating: number) => fetcher({ url: `/api/classes/${classID}/ratings`, method: 'put', body: { rating } });
