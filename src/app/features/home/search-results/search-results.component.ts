import { Component, OnDestroy, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { catchError, Observable, of, Subscription } from 'rxjs';
import { SearchResultService } from './search-results.service';

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

  constructor(private resultSerivce: SearchResultService) {}

  ngOnInit(): void {
    this.restaurantsSubscription = this.resultSerivce
      .getRestaurants()
      .subscribe((data) => {
        this.restaurants = data;
        console.log(this.restaurants);
      });
  }

  ngOnDestroy(): void {
    this.restaurantsSubscription.unsubscribe();
  }
}
