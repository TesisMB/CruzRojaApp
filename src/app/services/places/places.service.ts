import { DataService } from './../data.service';
import { MapService } from 'src/app/services/map/map.service';
import { PlacesApiClient } from './../../maps/api/placesApiClient';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { Feature, PlacesResponse } from 'src/app/maps/interfaces/places';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlacesService extends DataService{

  public useLocation?: [number, number];
  public isLoadingPlaces = false;
  public places: Feature [] = [];

  get isUserLocationReady(): boolean{
    return !!this.useLocation;
  }

  constructor(
    http: HttpClient,
    private placesApi: PlacesApiClient,
    private mapService: MapService
    ) {
    super(http, '/locations');
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<void>{

    // return new Promise( (resolve, reject) =>{
    //   navigator.geolocation.getCurrentPosition(
    //     ({coords}) => {
    //       this.useLocation = [coords.longitude, coords.latitude];
    //       resolve(this.useLocation);
    //     },
    //     (err) =>{
    //       alert('No se pudo obtener la geolocalización');
    //       console.log(err);
    //     });
    // });
  }

  /* getLocationVolunteers(): Observable<any>{
    const location = '/locations';
    return this.http.get(environment.apiURL + location);
  } */
}
