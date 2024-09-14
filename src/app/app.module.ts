import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultListComponent } from './search/search-result-list/search-result-list.component';
import { SearchResultItemComponent } from './search/search-result-list/search-result-item/search-result-item.component';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { HeaderComponent } from './header/header.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CommentComponent } from './restaurant/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultListComponent,
    SearchResultItemComponent,
    SearchBarComponent,
    HeaderComponent,
    RestaurantComponent,
    CommentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
