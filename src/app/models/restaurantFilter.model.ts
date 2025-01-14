export interface RestaurantFilters {
  search: string;
  isOpen: boolean;
  filterOptions: Record<string, string[]>;
}

export type FilterKey = string;

export enum FilterKeyEnum {
  Cuisine = 'cuisine',
  PriceRange = 'priceRange',
  Specialties = 'specialties',
}
