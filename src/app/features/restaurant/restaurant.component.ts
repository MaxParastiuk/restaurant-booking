import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Restaurant, Review } from 'src/app/models/restaurant.model';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  restaurant: Restaurant | null = null;
  loading: boolean = false;
  error: string | null = null;
  private restaurantSub: Subscription | null = null;
  isExpanded: boolean = false;
  isLoggedIn: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private dbService: RestaurantDbService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const restaurantId = params['id'];
      if (restaurantId) {
        this.loading = true;
        this.restaurantSub = this.dbService
          .getRestaurantById(restaurantId)
          .subscribe({
            next: (data) => {
              this.restaurant = data;
              this.loading = false;
              console.log(typeof data?.reviews);
            },
            error: () => {
              this.error = `Error fetching data restaurant. ID: ${restaurantId}`;
              this.loading = false;
            },
          });
      } else {
        this.error = 'the restaurant ID is missing';
      }
    });
    console.log(
      this.restaurant?.reviews.length,
      this.restaurant?.reviews,
      'review restaurant',
    );
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  hasReviews(): boolean {
    return (
      this.restaurant!.reviews &&
      Object.keys(this.restaurant!.reviews).length > 0
    );
  }
  getReviews() {
    return Object.values(this.restaurant!.reviews || {});
  }

  ngOnDestroy(): void {
    if (this.restaurantSub) {
      this.restaurantSub.unsubscribe();
    }
  }
}
