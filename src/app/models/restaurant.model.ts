export interface Restaurant {
  key: string;
  id: number;
  name: string;
  img: string;
  address: string;
  cuisineType: string;
  averageCheck: number;
  description: string;
  workingHours: WorkingHours;
  features: string[];
  reviews: Review[];
  location: Coordinate;
}

export interface WorkingHours {
  open: string;
  close: string;
  days: string[];
}

export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Coordinate {
  lat: number;
  lng: number;
}
