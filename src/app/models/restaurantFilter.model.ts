export interface RestaurantFilters {
  search: string;
  isOpen: boolean;
  filterOptions: Record<string, string[]>;
}

export type FilterKey = string;
