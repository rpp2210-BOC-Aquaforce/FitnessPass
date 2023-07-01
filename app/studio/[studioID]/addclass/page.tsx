'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getLocations } from '@/lib/api';
import { AddClassForm } from '@/components/index';

export default function AddClass() {
  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;
  const [studioLocs, setStudioLocs] = useState([{ location_id: '', name: '' }]);

  // To be refactored -- if no studio locations, give curtosey message to add studio location
  const fetchStudioLocations = async () => {
    await getLocations(studioID)
      .then((data) => {
        setStudioLocs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchStudioLocations();
  }, []);

  return (
    <div>
      <AddClassForm studioLocs={studioLocs} studioID={studioID} />
    </div>
  );
}
