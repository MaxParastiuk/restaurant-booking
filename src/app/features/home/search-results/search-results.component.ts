import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { Subscription } from 'rxjs';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  isLoading = true;
  restaurants: Restaurant[] = [];
  errorMessage: string | null = null;
  private restaurantsSubscription: Subscription = new Subscription();

  constructor(private resultSerivce: RestaurantDbService) {}

  ngOnInit(): void {
    this.restaurantsSubscription = this.resultSerivce
      .getRestaurants()
      .subscribe({
        next: (data) => {
          this.restaurants = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error during loading restaurants';
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.restaurantsSubscription.unsubscribe();
  }
}
