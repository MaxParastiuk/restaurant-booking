import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, Observable, of } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantDbService {
  constructor(private db: AngularFireDatabase) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.db
      .list<Restaurant>('/restaurants')
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error('Error', error);

          return of([]);
        }),
      );
  }
}
