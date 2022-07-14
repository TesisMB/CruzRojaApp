import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  template: `<capacitor-google-maps #map></capacitor-google-maps>
    <button (click)="createMap()">Create Map</button>`,
  styles: [
    `
      capacitor-google-maps {
        display: inline-block;
        width: 275px;
        height: 400px;
      }
    `,
  ],
  selector: 'app-google-map',
})
export class MapViewComponent {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  ionViewWillEnter(){
    this.createMap();
  }
  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
}
