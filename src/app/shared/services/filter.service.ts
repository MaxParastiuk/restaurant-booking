import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, map, Observable, range } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import {
  FilterKeyEnum,
  RestaurantFilters,
} from 'src/app/models/restaurantFilter.model';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private initialFilters: RestaurantFilters = {
    isOpen: false,
    search: '',
    filterOptions: {},
  };

  private selectedFilters = new BehaviorSubject<RestaurantFilters>(
    this.initialFilters,
  );
  private restaurantsSubject = new BehaviorSubject<Restaurant[]>([]);
  private filteredRestaurantSubject = new BehaviorSubject<Restaurant[]>([]);

  constructor(
    private dbService: RestaurantDbService,
    private timeService: TimeService,
  ) {
    // getting restaurants list
    this.initializeResturants();
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.filteredRestaurantSubject.asObservable();
  }

  setFiltersOptions(value: Record<string, string[]>): void {
    this.initialFilters = {
      ...this.initialFilters,
      filterOptions: { ...value },
    };
  }

  // setFilteredRestaurants(restaurants: Restaurant[]): void {
  //   this.filteredRestaurantSubject.next(restaurants);
  // }

  setSelectedFilters(filterForm: FormGroup): void {
    // get an initial filter values
    const currentFilters = this.selectedFilters.value;
    console.log(currentFilters, 'currentFilters - setSelectedFilters');

    // getting the options for filtering that have been selected
    const selectedFilters = this.extractSelectedFilters(
      filterForm,
      this.initialFilters.filterOptions,
    );
    // const updatedFilters = {
    //   ...currentFilters,
    //   filterOptions: { ...selectedFilters },
    // };

    this.selectedFilters.next(selectedFilters);
    this.applyFilters();
  }

  extractSelectedFilters(
    filterForm: FormGroup,
    filtersOption: Record<string, string[]>,
  ): RestaurantFilters {
    const selectedFilterOptions: Record<string, string[]> = {};
    if (filtersOption) {
      Object.keys(filtersOption).forEach((option) => {
        const filtersOptionFromForm = (
          filterForm.get('filterOptions') as FormGroup
        ).get(option)?.value;
        if (Array.isArray(filtersOptionFromForm)) {
          const selectedProperies = filtersOption[option].filter(
            (_, index) => filtersOptionFromForm[index],
          );
          selectedFilterOptions[option] = selectedProperies;
        }
      });
    }
    // get isOpen FormControl
    var isOpen = (filterForm.get('isOpen') as FormControl)?.value || false;
    // get search FormControl
    var search = (filterForm.get('search') as FormControl)?.value || '';

    return {
      isOpen,
      search,
      filterOptions: { ...selectedFilterOptions },
    };
  }

  initializeResturants(): void {
    this.dbService.getRestaurants().subscribe((restaurants) => {
      this.restaurantsSubject.next(restaurants);
      this.filteredRestaurantSubject.next(restaurants);
    });
  }

  applyFilters(): void {
    const filters: RestaurantFilters = this.selectedFilters.value;
    const restaurants = this.restaurantsSubject.value;

    // If no filters are applied, show all restaurants
    if (!this.hasActiveFilters(filters)) {
      this.filteredRestaurantSubject.next(restaurants);
      return;
    }

    const filteredRestaurants = restaurants.filter((restaurant) => {
      const matchesOpen =
        !filters.isOpen ||
        this.timeService.isRestaurantOpen(restaurant.workingHours);

      const matchesSearch =
        !filters.search || restaurant.name.includes(filters.search);

      const mathchesOptions = Object.entries(filters.filterOptions).every(
        ([key, values]) => {
          if (values.length === 0) {
            return true; // if filter values is emty than skip
          }

          if (key === FilterKeyEnum.Cuisine) {
            return values.some(
              (value) =>
                value.toLocaleLowerCase() ===
                restaurant.cuisineType.toLocaleLowerCase(),
            );
          }
          if (key === FilterKeyEnum.PriceRange) {
            return values.some((range) => {
              const [min, max] = range.replace('$', '').split('-').map(Number);
              return (
                restaurant.averageCheck >= min && restaurant.averageCheck <= max
              );
            });
          }

          if (key === FilterKeyEnum.Specialties) {
            // Check if the restaurant has the specified specialties
            return values.every((specialty) =>
              restaurant.features.some(
                (feature) =>
                  feature.toLocaleLowerCase() === specialty.toLocaleLowerCase(),
              ),
            );
          }
          return true;
        },
      );
      return matchesOpen && mathchesOptions && matchesSearch;
    });
    console.log(filteredRestaurants, 'filtered Rest');
    this.filteredRestaurantSubject.next(filteredRestaurants);
  }

  hasActiveFilters(filters: RestaurantFilters): boolean {
    return (
      filters.isOpen ||
      !!filters.search ||
      Object.values(filters.filterOptions).some((values) => values.length > 0)
    );
  }
}
