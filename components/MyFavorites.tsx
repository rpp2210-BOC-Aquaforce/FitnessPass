'use client';

// import { useState, useEffect } from 'react';
// import supabase from '../lib/supabase';
// import FavoriteEntry from './FavoriteEntry';

// export default function MyFavorites() {
//   interface ClassListHere {
//     class_id: number,
//     id: number,
//     user_id: number,
//     favorite: boolean,
//     class_rating: number,
//     created_at: string,
//  }

//   const defaultClassHere = {
//     class_id: 0,
//     id: 0,
//     user_id: 0,
//     favorite: false,
//     class_rating: 0,
//     created_at: 'string',
//   };

//   interface ClassListAgain {
//     // [x: string]: any;
//     class_id: number,
//     location_id: number,
//     name: string,
//     description: string,
//     date: string,
//     time: string,
//     duration: number,
//     instructor: string,
//     total_rating: number,
//     num_ratings: number,
//     created_at: string,
//  }

//   const defaultClassAgain = {
//     class_id: 0,
//     location_id: 0,
//     name: 'string',
//     description: 'string',
//     date: 'string',
//     time: 'string',
//     duration: 0,
//     instructor: 'string',
//     total_rating: 0,
//     num_ratings: 0,
//     created_at: 'string',
//   };

//   const [classList, setClassListHere] = useState<ClassListHere>(defaultClassHere);
//   const [classListAgain, setClassListAgain] = useState<ClassListAgain[]>([]);

//   async function getFavorites() {
//     try {
//       const { data: favorites, error } = await supabase
//         .from('user_classes')
//         .select('*')
//         .eq('favorite', true);
//       if (error) {
//         console.error('Supabase Error: ', error);
//       } else {
//         setClassListHere(favorites);
//         // console.log('classsss', favorites);
//         return favorites;
//       }
//     } catch (err) {
//       console.error('Unexpected error: ', err);
//     }
//     return null;
//   }

//   async function getClassesAgain() {
//     try {
//       const { data: allClasses, error } = await supabase
//         .from('classes')
//         .select('*')
//         .eq('class_id', 2);
//       if (error) {
//         console.error('Supabase Error: ', error);
//       } else {
//         setClassListAgain(allClasses);
//         console.log('my fav', classListAgain);
//         console.log('type here', typeof classListAgain);

//         return allClasses;
//       }
//     } catch (err) {
//       console.error('Unexpected error: ', err);
//     }
//     return null;
//   }

//   useEffect(() => {
//     getFavorites();
//     getClassesAgain();
//   }, []);

//   return (
//     <div className="text-2xl">
//       {/* {classListAgain.map((favorite: any) => (
//         <FavoriteEntry
//           favorite={favorite}
//           key={favorite.class_id}
//         />
//       ))} */}

//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import FavoriteEntry from './FavoriteEntry';

export default function MyFavorites() {
  interface ClassListHere {
    class_id: number;
    id: number;
    user_id: number;
    favorite: boolean;
    class_rating: number;
    created_at: string;
  }

  const defaultClassHere: ClassListHere = {
    class_id: 0,
    id: 0,
    user_id: 0,
    favorite: false,
    class_rating: 0,
    created_at: 'string',
  };

  interface ClassListAgain {
    class_id: number;
    location_id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    duration: number;
    instructor: string;
    total_rating: number;
    num_ratings: number;
    created_at: string;
  }

  const defaultClassAgain: ClassListAgain = {
    class_id: 0,
    location_id: 0,
    name: 'string',
    description: 'string',
    date: 'string',
    time: 'string',
    duration: 0,
    instructor: 'string',
    total_rating: 0,
    num_ratings: 0,
    created_at: 'string',
  };

  const [classList, setClassListHere] = useState<ClassListHere>(defaultClassHere);
  const [classListAgain, setClassListAgain] = useState<ClassListAgain[]>([]);

  async function getClassesAgain() {
    try {
      const { data: allClasses, error } = await supabase
        .from('classes')
        .select('*')
        .eq('class_id', 2);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        setClassListAgain(allClasses); // Update the state with the array of classes
        console.log('my fav', classListAgain);
        console.log('type here', typeof allClasses);
        return allClasses;
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  }

  useEffect(() => {
    getClassesAgain();
  }, []);

  return (
    <div className="text-2xl">

      {classListAgain.map((favorite: ClassListAgain) => (
        <FavoriteEntry
          favorite={favorite}
          key={favorite.class_id}
        />
      ))}
    </div>
  );
}
