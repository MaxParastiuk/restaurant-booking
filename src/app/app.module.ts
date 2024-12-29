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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
