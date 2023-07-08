import { getClassPopularity } from '@/lib/studio-classes';
import { PopularityData } from '@/lib/types';

export default async function getPopMetrics(studioID: string) {
  try {
    const data = (await getClassPopularity(studioID)) as unknown as PopularityData[];
    const groupedPopData: { name: string; popularity: number; }[] = [];

    data.map(({ classes }) => {
      const { name: itemName } = classes;
      const existingIndex = groupedPopData.findIndex((entry) => entry.name === itemName);

      if (existingIndex > -1) {
        groupedPopData[existingIndex].popularity += 1;
      } else {
        const newEntry = { name: itemName, popularity: 1 };
        groupedPopData.push(newEntry);
      }
      return { name: itemName, popularity: groupedPopData[existingIndex]?.popularity || 1 };
    });

    groupedPopData.sort((a, b) => b.popularity - a.popularity);

    return groupedPopData.slice(0, 15);
  } catch (err) {
    return ([{ name: null, popularity: null }]);
  }
}
