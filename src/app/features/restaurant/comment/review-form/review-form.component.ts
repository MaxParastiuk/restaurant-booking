import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from 'src/app/models/restaurant.model';
import { RestaurantDbService } from 'src/app/shared/services/restaurant-db.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent {
  submitted: boolean = false;
  reviewForm: FormGroup;
  @Input() isLoggedIn!: boolean;
  @Input() restaurantId!: string;
  rating: number = 0;
  hoverRating: number = 0;
  constructor(private dbService: RestaurantDbService) {
    this.reviewForm = new FormGroup({
      comment: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      rating: new FormControl<number>(this.rating, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
    });
  }

  setRating(value: number) {
    this.rating = value;
    this.reviewForm.controls['rating'].setValue(value);
  }

  addReview() {
    this.submitted = true;
    if (this.reviewForm.invalid) {
      return;
    }

    // AFTER LOG IN USE USER NAME FOR THE REVIEWER NAME; MUST BE DONE IN THE FUTURE
    const reviewData: Review = {
      comment: this.reviewForm.value.comment,
      rating: this.reviewForm.value.rating,
      reviewerName: 'Anonymous', // PLUG, MUST TO BE FIXED
      date: new Date().toISOString().split('T')[0],
    };

    this.dbService.addReview(+this.restaurantId, reviewData);
    this.reviewForm.reset();
  }
}
