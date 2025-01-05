import { Pipe, PipeTransform } from '@angular/core';
import { Review } from 'src/app/models/restaurant.model';

@Pipe({
  name: 'averageRating',
})
export class AverageRatingPipe implements PipeTransform {
  transform(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    } else {
      var totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      var averageRating = totalRating / reviews.length;
      return averageRating;
    }
  }
}
