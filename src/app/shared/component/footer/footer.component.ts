import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonModule,GoogleMapsModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  ngOnInit(): void {}

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24.7136, 
    lng: 46.6753 
  };
  zoom = 6;

  /*----------------- moveMap() -------------------*/
  moveMap(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  /*---------------------- move()--------------------------------*/
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  scrollTo(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
