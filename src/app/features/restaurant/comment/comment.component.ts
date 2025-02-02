import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Review } from 'src/app/models/restaurant.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() review!: Review;

  getStars(rating: number): number[] {
    return new Array(Math.floor(rating));
  }

  getEmptyStars(rating: number): number[] {
    return new Array(5 - Math.floor(rating));
  }
}
