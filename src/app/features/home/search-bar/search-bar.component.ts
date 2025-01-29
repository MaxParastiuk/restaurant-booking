import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FilterKey,
  RestaurantFilters,
} from 'src/app/models/restaurantFilter.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  isOptionsOpened: boolean = false;
  isFiltersLoading: boolean = true;
  selectedFilterOptions: string = '';
  filterOptionsList!: Record<string, string[]>;
  filtersForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filters: FilterService,
    private restaurantDb: RestaurantDbService,
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: new FormControl(''),
      isOpen: new FormControl(false),
      filterOptions: this.fb.group({}), // empty group
    });

    this.restaurantDb.getFiltersOptions().subscribe((filterOptions) => {
      this.filterOptionsList = filterOptions;
      this.filters.setFiltersOptions(filterOptions);
      this.isFiltersLoading = false;

      // creating a dynamic form group based on filter options
      const filterOptionsGroup = this.createFilterOptionsGroup(filterOptions);

      // setting up the created form group instead of the empty
      this.filtersForm.setControl('filterOptions', filterOptionsGroup);

      this.filtersForm.valueChanges.subscribe((formValue) => {
        localStorage.setItem('filtersForm', JSON.stringify(formValue));
      });
      // restore form from the LocalStorage
      this.restoreFormState();
    });
  }

  // dynamic FormGroup - filter options
  createFilterOptionsGroup(filterOptions: Record<string, string[]>): FormGroup {
    const filterGroup = this.fb.group({});

    Object.keys(filterOptions).forEach((key) => {
      const value = filterOptions[key];

      // if it as a Array,then create FormArray
      if (Array.isArray(value)) {
        filterGroup.addControl(
          key,
          this.fb.array(value.map(() => new FormControl(false))), // for each element of Array
        );
      } else {
        filterGroup.addControl(key, new FormControl(value)); // if it is a single property
      }
    });

    return filterGroup;
  }

  onSubmit() {
    this.isOptionsOpened = false;
    this.filters.setSelectedFilters(this.filtersForm);
  }

  // method to restore the previous selection of options
  restoreFormState(): void {
    const savedForm = localStorage.getItem('filtersForm');
    if (savedForm) {
      try {
        const formValue = JSON.parse(savedForm);

        this.filtersForm.patchValue(formValue);

        Object.keys(formValue.filterOptions).forEach((key) => {
          const formArray = this.getFormArray(key);
          formArray.patchValue(formValue.filterOptions[key]);
        });
      } catch (error) {
        console.error('Failed to restore form state:', error);
      }
    }
  }

  getFormArray(key: string): FormArray {
    return (this.filtersForm.get('filterOptions') as FormGroup).get(
      key,
    ) as FormArray;
  }

  toggleOptionsMenu(value: string) {
    if (
      !this.isOptionsOpened ||
      (this.selectedFilterOptions === value && this.isOptionsOpened)
    ) {
      this.isOptionsOpened = !this.isOptionsOpened;
    }
    this.selectedFilterOptions = value;
  }

  // method to iterate over the keys in the template
  objectKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }
}
