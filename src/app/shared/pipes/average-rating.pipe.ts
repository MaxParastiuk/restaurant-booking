import { Pipe, PipeTransform } from '@angular/core';
import { Review } from 'src/app/models/restaurant.model';

@Pipe({
  name: 'averageRating',
})
export class AverageRatingPipe implements PipeTransform {
  transform(reviews: Review[]): string {
    if (reviews.length === 0) {
      return 'empty';
    } else {
      var totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      var averageRating = totalRating / reviews.length;
      return averageRating.toFixed(2);
    }
  }
}
