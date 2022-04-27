import { PlacesService } from './../../services/places/places.service';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import * as L from 'LeafLet';

import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-shadow.png';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.css'],
})
export class DeploymentPage implements AfterViewInit, OnInit, OnDestroy  {

  handleDeployment: any;
  emergencies: EmergenciesDisasters = null;
  handlerChat: any;
  isAccepted: boolean = false;
  currentUser: any;
  map: L.Map;

  constructor(
    private alertService: AlertService,
    private chatService: ChatService,
    private location: Location,
    private placesService: PlacesService,
  ) { }

  ngAfterViewInit(): void {
    this.initMap();

  }

  ngOnInit() {
    this.handleDeployment = this.alertService._currentAlert.subscribe(
      data =>{
        this.emergencies = data;
        console.log('asd', data);
      });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Estoy en: ', window.location.pathname);
  }

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

  initMap(){
    var map = L.map('map').setView([this.emergencies.locationsEmergenciesDisasters.locationLatitude, this.emergencies.locationsEmergenciesDisasters.locationLongitude], 15);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWdjc29hZCIsImEiOiJjbDA1eXpoOGwwdWQ3M2tueXVycHFqMzhlIn0.CXkUig7PQwf0piWpitvI2w'

  }).addTo(map);
  setTimeout(() => {
    map.invalidateSize();
  }, 1000);

    var marker = L.marker([this.emergencies.locationsEmergenciesDisasters.locationLatitude, this.emergencies.locationsEmergenciesDisasters.locationLongitude],{
      fillColor: '#ccc'
    })
    .addTo(map);

    var circle =  L.circle([this.emergencies.locationsEmergenciesDisasters.locationLatitude, this.emergencies.locationsEmergenciesDisasters.locationLongitude], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.3,
      radius: 800,
      stroke: false
    }).addTo(map);

    function onLocationError(e) {
      alert(e.message);
  }

  map.on('locationerror', onLocationError);

  }

  ngOnDestroy(){
    this.handleDeployment.unsubscribe();
  }
}
