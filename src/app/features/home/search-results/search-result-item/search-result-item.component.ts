import { Component, Input } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.css'],
})
export class SearchResultItemComponent {
  @Input() restaurant!: Restaurant;
}
