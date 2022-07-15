import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Position } from '@angular/compiler';
import { EmergenciesDisasters } from 'src/app/models';

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
export class MapViewComponent implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  coordinates: any;
  handleService: Subscription;
  alerta: EmergenciesDisasters;
constructor(private service: AlertService){}

  ngOnInit(){
    this.printCurrentPosition();
    this.handleService = this.service.currentAlert$
    .subscribe(
      (data) => {
        this.alerta = data;
        // this.createMap();
      },
      (error) =>{
      console.log('Error en subs alerta => ',error);
      });
  }

  async printCurrentPosition() {
    this.coordinates = await Geolocation.getCurrentPosition();
    console.log('Current position:', this.coordinates);
  };



  ionViewWillEnter(){
    // this.createMap();
  }
  async createMap() {

    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: this.alerta.locationsEmergenciesDisasters.locationlatitude,
          lng: this.alerta.locationsEmergenciesDisasters.locationlongitude,
        },
        zoom: 15,
      },
    });

    const myMarkerId = await this.newMap.addMarkers([{
      title: 'Aqui estoy yo!',
      snippet: 'Mi ubicacion' ,
    coordinate: {
      lat: this.coordinates.coords.latitude,
      lng: this.coordinates.coords.longitude,
    }
  },
{
      title: 'Alerta!',
      // draggable: true,
      snippet: this.alerta.alerts.alertMessage ,
      coordinate: {
        lat: this.alerta.locationsEmergenciesDisasters.locationlatitude,
        lng: this.alerta.locationsEmergenciesDisasters.locationlongitude,
      }
    }
]);

const myMarker = await this.newMap.addMarker({
  title: 'Aqui estoy yo!',
  snippet: 'Mi ubicacion' ,
coordinate: {
  lat: this.coordinates.coords.latitude,
  lng: this.coordinates.coords.longitude,
}
});

// const circle = await this.newMap.
// .Circle({
//   radius: 70*1000,
//   center: point,
//   map: ItemMap.map,
//   fillColor: '#FF0000',
//   fillOpacity: 0.2,
//   strokeColor: '#FF0000',
//   strokeOpacity: 0.6
//     });
  }
}
