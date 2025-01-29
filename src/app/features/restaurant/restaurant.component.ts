import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
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

  constructor(
    private route: ActivatedRoute,
    private dbService: RestaurantDbService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const restaurantId = params['id'];
      if (restaurantId) {
        this.loading = true;
        console.log('id', restaurantId);
        this.restaurantSub = this.dbService
          .getRestaurantById(restaurantId)
          .subscribe({
            next: (data) => {
              this.restaurant = data;
              console.log(data, 'RESTAUR');
              this.loading = false;
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
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnDestroy(): void {
    if (this.restaurantSub) {
      this.restaurantSub.unsubscribe();
    }
  }
}
