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

export const updateRating = (classID: number, rating: number) => fetcher({ url: `/api/classes/${classID}/ratings`, method: 'put', body: { rating } });
