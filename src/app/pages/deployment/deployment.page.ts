import { PlacesService } from './../../services/places/places.service';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import * as L from 'LeafLet';

import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.css'],
})
export class DeploymentPage implements AfterViewInit, OnInit, OnDestroy  {

  handleDeployment: any;
  emergencies: EmergenciesDisasters = null;
  handlerChat: any;
  isAccepted = false;
  currentUser: any;
  map: L.Map;

  constructor(
    private alertService: AlertService,
    private chatService: ChatService,
    private router: Router,
    private location: Location,
    private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.getPlacesByQuery();
    this.handleDeployment = this.alertService._currentAlert.subscribe(
      data =>{
        this.emergencies = data;
        console.log('asd', data);
      });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Estoy en: ', window.location.pathname);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  get isSubscribe(){
    if(this.emergencies.chatRooms && this.currentUser.roleName == 'Voluntario' && this.emergencies.alerts.alertDegree !== 'Controlado'){
        return this.emergencies.chatRooms.usersChatRooms.find(x => x.userID === this.currentUser.userID);
      }
    else {
  return true;
}}

  setChatGroup(){
    console.log(this.emergencies);
    this.handlerChat = this.chatService.joinGroup(this.emergencies.emergencyDisasterID).subscribe(data =>{
      console.log('Aceptado');
        this.isAccepted = true;
    }, error =>{
      console.log('error', error);
        this.isAccepted = true;
    });
  }

  getPlacesByQuery(){
    this.placesService.getAll()
    .subscribe(resp => {

      console.log('Ubicaciones:', resp);
      /* this.isLoadingPlaces = false;
      this.places = resp.features;

      this.mapService.createMarkersFromPlaces(this.places); */
    });
  }

  initMap(){
    const map = L.map('map').setView(
      [
        this.emergencies.locationsEmergenciesDisasters.locationLatitude,
         this.emergencies.locationsEmergenciesDisasters.locationLongitude
        ], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
     {
    attribution: 'Ubicacíon de la emergencia de <bold>Cruz Roja Córdoba</bold>',
    maxZoom: 14,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWdjc29hZCIsImEiOiJjbDA1eXpoOGwwdWQ3M2tueXVycHFqMzhlIn0.CXkUig7PQwf0piWpitvI2w'

  }).addTo(map);
  setTimeout(() => {
    map.invalidateSize();
  }, 500);

    const marker = L.marker(
      [this.emergencies.locationsEmergenciesDisasters.locationLatitude,
      this.emergencies.locationsEmergenciesDisasters.locationLongitude
    ],
      {
      fillColor: '#ccc'
    })
    .addTo(map);

    const circle =  L.circle(
      [this.emergencies.locationsEmergenciesDisasters.locationLatitude,
         this.emergencies.locationsEmergenciesDisasters.locationLongitude
        ],
         500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.3,
      radius: 800,
      stroke: false
    }).addTo(map);

    const onLocationError = (e) => {
      alert(e.message);
  };

  map.on('locationerror', onLocationError);
  }

  navigateVolunteer(){
    this.router.navigate(['emergency/',  this.emergencies.emergencyDisasterID ]);
  }

  ngOnDestroy(){
    this.handleDeployment.unsubscribe();
  }
}
