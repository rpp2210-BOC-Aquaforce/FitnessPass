// eslint-disable-next-line consistent-return
export const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    ...(body && {body: JSON.stringify(body)}),
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

// Would like to refactor to a get method
export const getLocations = (studio: string) => fetcher({ url: '/api/fetch-studio-locs', method: 'post', body: { studioId: studio } });
