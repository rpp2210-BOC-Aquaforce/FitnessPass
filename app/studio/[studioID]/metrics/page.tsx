import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { authOptions } from '@/lib/auth';
import { MetricsLoading } from '@/components/index';
import getEngMetrics from '@/lib/get-class-eng-metrics';
import getPopMetrics from '@/lib/get-class-pop-metrics';

export const revalidate = 60;

const DynamicMetricsView = dynamic(() => import('../../../../src/components/Metrics/MetricsView'), {
  loading: () => <MetricsLoading />,
});

export default async function Metrics() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const studioID = (session?.user as any)?.id;

  const engMetrics = await getEngMetrics(studioID);
  const popMetrics = await getPopMetrics(studioID);

  return (
    <main className="flex min-h-screen flex-col items-center p-3 sm:p-8">
      <div
        className="flex flex-col items-center mt-2 pt-2 pb-2 space-y-4 bg-white shadow-md rounded-lg w-full"
        style={{ height: '80vh' }}
      >
        <h1 className="text-solid-orange text-3xl font-semibold mt-2">My Metrics</h1>
        <DynamicMetricsView studioPopMetrics={popMetrics} studioEngMetrics={engMetrics} />
      </div>
    </main>
  );
}
