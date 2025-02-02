import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { Restaurant, Review } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantDbService {
  constructor(private db: AngularFireDatabase) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.db
      .list<Restaurant>('/restaurants')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              key: c.payload.key ? c.payload.key.toString() : '',
              ...c.payload.val(),
            } as Restaurant;
          }),
        ),
        catchError((error) => {
          console.error('Error fetching restaurants:', error);
          return of([]);
        }),
      );
  }

  getFiltersOptions(): Observable<Record<string, string[]>> {
    return this.db
      .object<Record<string, string[]>>('/filterOptions')
      .valueChanges()
      .pipe(
        map((data) => data || {}),
        catchError((error) => {
          console.log('Error', error);

          return of({});
        }),
      );
  }
  getRestaurantById(key: string): Observable<Restaurant | null> {
    return this.db
      .object<Restaurant>(`/restaurants/${key}`) // getting only one restaurants by id
      .valueChanges()
      .pipe(
        map((restaurant) => {
          if (restaurant) {
            return { ...restaurant, key: key.toString() }; // adding key
          }
          return null;
        }),
        catchError((error) => {
          console.error('Error fetching restaurant by key:', error);
          return of(null);
        }),
      );
  }

  addReview(restaurantId: number, review: Review): void {
    this.db
      .list(`/restaurants/${restaurantId}/reviews`)
      .push(review)
      .then(() => {
        console.log('Review added successfully');
      })
      .catch((error) => {
        console.error('Error adding review:', error);
      });
    // this.db
    //   .list(`/restaurants/${restaurantId}/reviews`)
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) => {
    //       const listReviews = changes.map((c) => ({
    //         key: c.payload.key,
    //         ...(c.payload.val() as Review),
    //       }));

    //       const lastReview = listReviews.reduce((max, review) => {
    //         const reviewId = parseInt(review.key || '0', 10);
    //         return reviewId > max ? reviewId : max;
    //       }, 0);

    //       const newReviewId = lastReview + 1;

    //       this.db
    //         .object(`/restaurants/${restaurantId}/reviews/${newReviewId}`)
    //         .set(review)
    //         .then(() => console.log('Review added successfully'))
    //         .catch((error) => console.error('Error adding review:', error));
    //     }),
    //     catchError((error) => {
    //       console.error('Error fetching reviews:', error);
    //       return of();
    //     }),
    //   )
    //   .subscribe();
  }
}
