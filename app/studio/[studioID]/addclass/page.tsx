'use client';

import React, { useState, useEffect } from 'react';
import { getLocations } from '@/lib/api';
import AddClassForm from '../../../../components/AddClass/AddClassForm';

export default function AddClass() {
  const [studioLocs, setStudioLocs] = useState([{ location_id: '', name: '' }]);

  // To be refactored to fetch studio locations on form load (need studio id from auth)
  // To be refactored -- if no studio locations, give curtosey message to add studio location
  const fetchStudioLocations = async () => {
    const studioId = '10'; // Temporarily hard-coded until auth merged in *
    await getLocations(studioId)
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
      <AddClassForm studioLocs={studioLocs} />
    </div>
  );
}
