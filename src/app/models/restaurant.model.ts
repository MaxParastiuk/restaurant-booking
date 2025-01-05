export interface Restaurant {
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
}

interface WorkingHours {
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
