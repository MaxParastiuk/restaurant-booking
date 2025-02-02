import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restaurant-map',
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.css'],
})
export class RestaurantMapComponent implements OnInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  map!: google.maps.Map;

  ngOnInit(): void {
    console.log(this.latitude, 'latitude');
    if (!this.latitude || !this.longitude) {
      console.error('Coordinates are missing!');
      return;
    }

    const loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          center: {
            lat: this.latitude,
            lng: this.longitude,
          },
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
        },
      );

      new google.maps.Marker({
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map,
        title: 'Restauran location',
      });
    });
  }
}
