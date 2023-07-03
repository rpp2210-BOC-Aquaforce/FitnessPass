import { getStudioClasses, getClassPopularity } from '@/lib/api';

export default async function getPopMetrics(studioID: string) {
  try {
    const data = await getStudioClasses(studioID);
    const metricsMap = new Map();

    await Promise.all(data.map(async (item: { class_id: string; name: string; }) => {
      const popularity = await getClassPopularity(item.class_id);
      if (metricsMap.has(item.name)) {
        metricsMap.set(item.name, metricsMap.get(item.name) + popularity);
      } else {
        metricsMap.set(item.name, popularity);
      }
    }));

    const combinedMetrics = Array.from(metricsMap.entries()).map(([name, popularity]) => ({
      name,
      popularity,
    }));

    return combinedMetrics;
  } catch (err) {
    return ([{ name: null, popularity: null }]);
  }
}
