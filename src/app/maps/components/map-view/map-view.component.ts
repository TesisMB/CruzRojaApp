import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from 'src/app/services/places/places.service';
import { MapService } from 'src/app/services/map/map.service';
import * as L from 'LeafLet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('map') mapContainer: ElementRef;
  map: L.Map;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.initMap();
  /*   if( !this.placesService.useLocation) throw Error('No hay placesService.userLocation'); */
 }

 initMap(){

  this.map = L.map('map').setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWdjc29hZCIsImEiOiJjbDA1eXpoOGwwdWQ3M2tueXVycHFqMzhlIn0.CXkUig7PQwf0piWpitvI2w'
}).addTo(this.map);

setTimeout(() => {
  this.map.invalidateSize();
}, 500);

  const onLocationError = (e) => {
    alert(e.message);
};

this.map.on('locationerror', onLocationError);
this.map.remove();
}

}
