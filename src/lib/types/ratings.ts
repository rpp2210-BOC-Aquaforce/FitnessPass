export interface FetchClass{
  id: number,
  class_id: number,
  user_id: number,
  class_rating: number,
  created_at: string,
  favorite: boolean
}

export interface ClassList {
    class_id: number,
    location_id: number,
    name: string,
    description: string,
    date: string,
    time: string,
    duration: number,
    instructor: string,
    total_rating: number,
    num_ratings: number,
    created_at: string,
 }

export interface ClassRatings{
  id: number | string,
  rating: number | null,
}
