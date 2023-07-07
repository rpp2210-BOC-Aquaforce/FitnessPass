import { getStudioClasses, getClassPopularity } from '@/lib/api';

export default async function getPopMetrics(studioID: string) {
  try {
    const data = await getStudioClasses(studioID);
    const metricsMap = new Map();

    // eslint-disable-next-line max-len
    const popularity = await Promise.all(data.map((item: { class_id: string; name: string; }) => getClassPopularity(item.class_id)));

    data.forEach((item: { name: string }, index: number) => {
      if (metricsMap.has(item.name)) {
        metricsMap.set(item.name, metricsMap.get(item.name) + popularity[index]);
      } else {
        metricsMap.set(item.name, popularity[index]);
      }
    });

    // eslint-disable-next-line no-shadow
    const combinedMetrics = Array.from(metricsMap.entries())
      // eslint-disable-next-line no-shadow
      .map(([name, popularity]) => ({ name, popularity }))
      // eslint-disable-next-line no-shadow
      .filter(({ popularity }) => popularity > 0);
    return combinedMetrics;
  } catch (err) {
    return ([{ name: null, popularity: null }]);
  }
}
