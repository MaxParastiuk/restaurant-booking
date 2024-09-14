export interface Restaurant {
  id: number;
  name: string;
  address: string;
  cuisineType: string; // Тип кухни
  priceRange: string; // Ценовой диапазон, например, "$", "$$", "$$$"
  averageCheck: number; // Средний чек
  description: string; // Описание ресторана
  workingHours: WorkingHours; // Время работы (подтип)
  features: string[]; // Особенности, например, ["Wi-Fi", "Outdoor Seating"]
  reviews: Review[]; // Отзывы (подтип)
}

interface WorkingHours {
  open: string; // Время открытия, например, "08:00 AM"
  close: string; // Время закрытия, например, "10:00 PM"
  days: string[]; // Дни работы, например, ["Monday", "Tuesday", "Wednesday"]
}

interface Review {
  reviewerName: string; // Имя рецензента
  rating: number; // Оценка, например, 4.5
  comment: string; // Текст отзыва
  date: string; // Дата отзыва
}
