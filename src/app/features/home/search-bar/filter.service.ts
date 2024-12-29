import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { RestaurantFilters } from 'src/app/models/restaurantFilter.model';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private dbService: RestaurantDbService) {}

  getRestaurantFilters() {
    return this.dbService.getFilters();
  }

  initializeSelectedFilters(
    filtersOption: Record<string, string[]>,
  ): Record<string, string[]> {
    const selectedFilters: Record<string, string[]> = {};
    Object.keys(filtersOption).forEach((key) => {
      selectedFilters[key] = [];
    });
    return selectedFilters;
  }

  extractFilters(
    filterForm: FormGroup,
    filtersOption: Record<string, string[]>,
  ): Record<string, string[]> {
    const selectedFilters: Record<string, string[]> = {};
    Object.keys(filtersOption).forEach((option) => {
      const currentProperties = (
        filterForm.get('filterOptions') as FormGroup
      ).get(option)?.value;
      if (Array.isArray(currentProperties)) {
        const selectedProperies = filtersOption[option].filter(
          (_, index) => currentProperties[index],
        );
        selectedFilters[option] = selectedProperies;
      }

      // NEED TO BE IMPROVED
    });
    return selectedFilters;
  }
}
