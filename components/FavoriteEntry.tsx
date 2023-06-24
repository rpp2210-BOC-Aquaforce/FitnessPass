'use client';

import React from 'react';

type FavoriteEntryProps = {
  favorite: object; // Replace 'object' with the actual type of the 'favorite' prop
   // Replace 'number' with the actual type of the 'key' prop
};

export default function FavoriteEntry({ favorite }: FavoriteEntryProps) {
  console.log('favvv', favorite);
  return (
    <div className="text-2xl">
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Favorites</h1>
      <div className="relative sm:inset-10 inset-y-4 md:w-1/3 bg-white">
        <div className="inline-block">
          {favorite.name}
        </div>
        <br />
        <div className="inline-block">
          {favorite.description}
        </div>
        <br />
        <div className="inline-block">
        {favorite.instructor}
        </div>
        <br />
      </div>
    </div>
  );
}

// export default FavoriteEntry;
// export default function FavoriteEntry(): React.FC<FavoriteEntryProps> {
//   return (
// <div className="text-2xl">

//   <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Favorites</h1>
//   <div className="relative sm:inset-10 md:w-1/3">
//     <div className="inline-block">
//       Placeholder 1
//     </div>
//     <br />
//     <div className="inline-block">
//       Placeholder 1
//     </div>
//     <br />
//     <div className="inline-block">
//       Placeholder 1
//     </div>
//     <br />
//   </div>

// </div>;
//   );
// }
