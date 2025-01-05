import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FilterKey,
  RestaurantFilters,
} from 'src/app/models/restaurantFilter.model';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  isOptionsOpened: boolean = false;
  isFiltersLoading: boolean = true;
  selectedOption: FilterKey = '';
  selectedFilters!: Record<string, string[]>;
  restaurantFilters: RestaurantFilters = {
    isOpen: false,
    search: '',
    filterOptions: {},
  };
  filtersForm!: FormGroup;

  constructor(private fb: FormBuilder, private filters: FilterService) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group({
      search: new FormControl(''),
      isOpen: new FormControl(false),
      filterOptions: this.fb.group({}), // empty group
    });

    this.filters.getRestaurantFilters().subscribe((filterOptions) => {
      this.restaurantFilters.filterOptions = filterOptions;
      this.isFiltersLoading = false;
      this.selectedFilters =
        this.filters.initializeSelectedFilters(filterOptions);

      // dynamic adding of all filtering properties to the form
      const filterOptionsGroup = this.createFilterOptionsGroup(filterOptions);

      this.filtersForm.setControl('filterOptions', filterOptionsGroup);

      this.filtersForm.valueChanges.subscribe((formValue) => {
        localStorage.setItem('filtersForm', JSON.stringify(formValue));
      });
      // restore form from the LocalStorage
      this.restoreFormState();
    });
  }

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
    this.selectedFilters = this.filters.extractFilters(
      this.filtersForm,
      this.restaurantFilters.filterOptions,
    );
  }

  // method to restore the previous selection of options
  restoreFormState(): void {
    const savedForm = localStorage.getItem('filtersForm');
    if (savedForm) {
      const formValue = JSON.parse(savedForm);

      this.filtersForm.patchValue(formValue);

      Object.keys(formValue.filterOptions).forEach((key) => {
        const formArray = this.getFormArray(key);
        formArray.patchValue(formValue.filterOptions[key]);
      });
    }
  }

  getFormArray(key: string): FormArray {
    return (this.filtersForm.get('filterOptions') as FormGroup).get(
      key,
    ) as FormArray;
  }

  toggleOptionsMenu(value: FilterKey) {
    if (
      !this.isOptionsOpened ||
      (this.selectedOption === value && this.isOptionsOpened)
    ) {
      this.isOptionsOpened = !this.isOptionsOpened;
    }
    this.selectedOption = value;
  }

  // method to iterate over the keys in the template
  objectKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
  }
}
