import { PlacesService } from './../../services/places/places.service';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import * as L from 'LeafLet';

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
  private map;

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
        console.log('asdsadasd', data);
      });
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
    var map = L.map('map').setView([this.emergencies.locations.locationLatitude, this.emergencies.locations.locationLongitude], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWdjc29hZCIsImEiOiJjbDA1eXpoOGwwdWQ3M2tueXVycHFqMzhlIn0.CXkUig7PQwf0piWpitvI2w'
  }).addTo(map);

    var marker = L.marker([this.emergencies.locations.locationLatitude, this.emergencies.locations.locationLongitude],{
      fillColor: '#ccc'
    })
    .addTo(map);

    var circle = L.circle([this.emergencies.locations.locationLatitude, this.emergencies.locations.locationLongitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.3,
      radius: 800,
      stroke: false
    }).addTo(map);

    var popup = L.popup().setLatLng([this.emergencies.locations.locationLatitude, this.emergencies.locations.locationLongitude])

    function onMapClick(e) {
      popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
    }

  }

  ngOnDestroy(){
    this.handleDeployment.unsubscribe();
  }
}
