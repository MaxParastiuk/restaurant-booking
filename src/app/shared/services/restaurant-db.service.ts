import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { catchError, map, Observable, of } from 'rxjs';
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
  getRestaurantById(id: string): Observable<Restaurant | null> {
    return this.db
      .list<Restaurant>('/restaurants')
      .valueChanges()
      .pipe(
        map((restaurants) => {
          // Ищем ресторан с соответствующим id
          return (
            restaurants.find((restaurant) => restaurant.id === +id) || null
          );
        }),
        catchError((error) => {
          console.error('Error fetching restaurant by ID:', error);
          return of(null);
        }),
      );
  }
}
