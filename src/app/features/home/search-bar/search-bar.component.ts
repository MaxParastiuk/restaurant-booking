import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  form: FormGroup;
  cuisine: string[] = [];
  priceRange: string[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
      isOpen: [false],
      cuisine: [''],
      priceRange: [''],
      type: [''],
      specialties: [[]],
    });
  }
}
