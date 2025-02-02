import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Subscription } from 'rxjs';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { FilterService } from 'src/app/shared/services/filter.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  isLoading = true;
  restaurants: Restaurant[] = [];
  errorMessage: string | null = null;
  currentPage: number = 1;
  limitPages: number = 9;
  currenPageRestaurants: Restaurant[] = [];
  @ViewChild('resultsContainer', { static: false })
  resultsContainer!: ElementRef;
  private restaurantsSubscription: Subscription = new Subscription();

  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.restaurantsSubscription = this.filterService
      .getRestaurants()
      .subscribe({
        next: (data) => {
          this.restaurants = data;
          this.isLoading = false;
          console.log(data, 'restaurants');
          // reset currentPage
          this.currentPage = 1;
          this.updateCurrentPageRestaurants();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error during loading restaurants';
          this.isLoading = false;
        },
      });
  }
  changePage(value: number) {
    this.currentPage = value;
    this.updateCurrentPageRestaurants();
    if (this.resultsContainer) {
      this.resultsContainer.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  updateCurrentPageRestaurants(): void {
    const startIdx = (this.currentPage - 1) * this.limitPages;
    const endIdx = startIdx + this.limitPages;
    this.currenPageRestaurants = this.restaurants.slice(startIdx, endIdx);
  }

  ngOnDestroy(): void {
    this.restaurantsSubscription.unsubscribe();
  }
}
