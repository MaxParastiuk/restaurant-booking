import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/header.component';

// firebase SDK
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HomeComponent } from './features/home/home.component';
import { SearchBarComponent } from './features/home/search-bar/search-bar.component';
import { SearchResultComponent } from './features/home/search-results/search-results.component';
import { SearchResultItemComponent } from './features/home/search-results/search-result-item/search-result-item.component';
import { BookingComponent } from './features/booking/booking.component';
import { RestaurantComponent } from './features/restaurant/restaurant.component';
import { CommentComponent } from './features/restaurant/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CamelCaseToWordsPipe } from './shared/pipes/camel-case-to-words.pipe';
import { PriceRangePipe } from './shared/pipes/price-range.pipe';
import { AverageRatingPipe } from './shared/pipes/average-rating.pipe';
import { PaginationComponent } from './features/home/search-results/pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortDayPipe } from './shared/pipes/short-day.pipe';
import { RestaurantMapComponent } from './features/restaurant/restaurant-map/restaurant-map.component';
import { ReviewFormComponent } from './features/restaurant/comment/review-form/review-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RestaurantComponent,
    CommentComponent,
    HomeComponent,
    SearchBarComponent,
    SearchResultItemComponent,
    SearchResultComponent,
    BookingComponent,
    CamelCaseToWordsPipe,
    PriceRangePipe,
    AverageRatingPipe,
    PaginationComponent,
    ShortDayPipe,
    RestaurantMapComponent,
    ReviewFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
