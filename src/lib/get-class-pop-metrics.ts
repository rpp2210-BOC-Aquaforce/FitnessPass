import { getStudioClasses, getClassPopularity } from '@/lib/studio-classes';

export default async function getPopMetrics(studioID: string) {
  try {
    const data = await getStudioClasses(studioID);
    const metricsMap = new Map();

    const totalPopularity = await Promise.all(data.map(
      (item: { class_id: string; name: string; }) => getClassPopularity(item.class_id),
    ));

    data.forEach((item: { name: string }, index: number) => {
      const popularity = totalPopularity[index];
      if (metricsMap.has(item.name)) {
        metricsMap.set(item.name, metricsMap.get(item.name) + popularity);
      } else {
        metricsMap.set(item.name, popularity);
      }
    });

    const combinedMetrics = Array.from(metricsMap.entries())
      .map(([name, popularity]) => ({ name, popularity }))
      .filter(({ popularity }) => popularity > 0);
    return combinedMetrics;
  } catch (err) {
    return ([{ name: null, popularity: null }]);
  }
}
