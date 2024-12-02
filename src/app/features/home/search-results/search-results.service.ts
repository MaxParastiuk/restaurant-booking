import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class SearchResultService {
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
