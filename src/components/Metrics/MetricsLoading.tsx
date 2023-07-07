import React from 'react';

export default function MetricsLoading() {
  return (
    <div className="flex flex-col mt-2 pt-2 pb-2 space-y-4 w-full text-xl font-semibold text-mint-seafoam justify-center justify-items-center items-center" style={{ height: '80vh' }}>
      <div className="flex flex-col space-y-1 text-lg justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-mint-orange to-mint-seafoam animate-spin">
          <div className="h-9 w-9 rounded-full bg-white" />
        </div>
      </div>
      <h2>Loading Your Metrics...</h2>
    </div>
  );
}
