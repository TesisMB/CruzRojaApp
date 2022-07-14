import { PlacesService } from './../../services/places/places.service';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, Input ,ElementRef, ViewChild  } from '@angular/core';
import { Location } from '@angular/common';

import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.css'],
})
export class DeploymentPage implements OnInit, OnDestroy  {

  @Input() emergencies: EmergenciesDisasters = null;
  handleDeployment: any;
  handlerChat: any;
  isAccepted = false;
  currentUser: any;
  // map: L.Map;
  isLoading = false;
  id = null;
  error: any = '';
  handleAlert: Subscription;
  constructor(
    private alertService: AlertService,
    private chatService: ChatService,
    public toastCtrl: ToastController,
    private router: Router,
    private location: Location,
    private placesService: PlacesService,
    private ionLoader: LoaderService,
    private route: ActivatedRoute
  ) { }


  public get isSubscribe(){
    return this.emergencies.isSubscribe;
  }
  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
    });
    // this.getPlacesByQuery();
    // eslint-disable-next-line no-underscore-dangle
    //   console.log('Estoy en: ', window.location.pathname);
    // this.ionLoader.showLoader();
    this.handleDeployment = this.alertService.currentAlert.subscribe(
      data =>{
        if(!data){
          this.getAlertByID();
        }
        this.emergencies = data;
        console.log('alerta por Observable=>', data);
        // this.initMap();
        // this.ionLoader.hideLoader();
      });
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ionViewWillEnter(){
  }

  getAlertByID(){
    this.ionLoader.showLoader();
    this.handleAlert = this.alertService.getByIdWithoutFilter(this.id)
    .subscribe(
    (data) => {
        this.emergencies = data;
        console.log('Alerta by ID => ', data);
        this.ionLoader.hideLoader();
        // this.initMap();
    },
    (err) => {
      this.error = err;
    this.ionLoader.hideLoader();

    });
  }
  setChatGroup(){
    this.isLoading = true;
    this.ionLoader.showLoader();
    console.log(this.emergencies);
    this.handlerChat = this.chatService.joinGroup(this.emergencies.emergencyDisasterID)
    .subscribe(
    (data) =>{
      console.log('Aceptado');
      this.emergencies.isSubscribe = true;
      this.ionLoader.hideLoader();
      this.isLoading = false;
},
    (error) =>{
    console.log('error', error);
     this.ionLoader.hideLoader();
     this.showToast('Usted ya esta registrado en esta alerta', 3000);
     this.isAccepted = true;
     this.isLoading = false;
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

  // initMap(){
  //   const map = L.map('map').setView(
  //     [
  //       this.emergencies.locationsEmergenciesDisasters.locationlatitude,
  //        this.emergencies.locationsEmergenciesDisasters.locationlongitude
  //       ], 15);

  //   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  //    {
  //   attribution: 'Ubicacíon de la emergencia de <bold>Cruz Roja Córdoba</bold>',
  //   maxZoom: 14,
  //   id: 'mapbox/streets-v11',
  //   tileSize: 512,
  //   zoomOffset: -1,
  //   accessToken: 'pk.eyJ1IjoibWdjc29hZCIsImEiOiJjbDA1eXpoOGwwdWQ3M2tueXVycHFqMzhlIn0.CXkUig7PQwf0piWpitvI2w'

  // }).addTo(map);
  // setTimeout(() => {
  //   map.invalidateSize();
  // }, 500);

  //   const marker = L.marker(
  //     [this.emergencies.locationsEmergenciesDisasters.locationlatitude,
  //     this.emergencies.locationsEmergenciesDisasters.locationlongitude
  //   ],
  //     {
  //     fillColor: '#ccc'
  //   })
  //   .addTo(map);

  //   const circle =  L.circle(
  //     [this.emergencies.locationsEmergenciesDisasters.locationlatitude,
  //        this.emergencies.locationsEmergenciesDisasters.locationlongitude
  //       ],
  //        500, {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.3,
  //     radius: 800,
  //     stroke: false
  //   }).addTo(map);

  //   const onLocationError = (e) => {
  //     alert(e.message);
  // };

  // map.on('locationerror', onLocationError);
  // }

  async showToast(msg: string, duration: number) {
    // this.toastCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: msg,
      duration,
    });
    await toast.present();
  }

  navigateVolunteer(){
    this.router.navigate(['emergency/',  this.emergencies.emergencyDisasterID]);
  }

  /* async showToast(msg: string, duration: number) {
    // this.toastCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
    });
    await toast.present();
  } */

  ngOnDestroy(){
    this.handleDeployment.unsubscribe();
  }
}

