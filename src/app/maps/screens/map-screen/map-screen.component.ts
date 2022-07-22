import { PlacesService } from './../../../services/places/places.service';
import { EmergenciesDisasters } from './../../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, Input ,ElementRef, ViewChild  } from '@angular/core';
import { Location } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { Platform, ModalController } from '@ionic/angular';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';


import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeploymentPage } from './../../../pages/deployment/deployment.page';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styleUrls: ['./map-screen.component.css'],
})
export class MapScreenComponent implements OnInit, OnDestroy {

  @Input() emergencies: EmergenciesDisasters = null;
  @ViewChild('mapRef') mapRef: ElementRef<HTMLElement>;
  boundingRect: any;
   newMap: GoogleMap;
  markers = [];
  coordinates;
  mapState: 0 | 1 = 0;

  mapsOn = false;
  handleDeployment: any;
  handlerChat: any;
  isAccepted = false;
  currentUser: any;
  isLoading = true;
  id = null;
  error: any = '';
  handleAlert: Subscription;
  constructor(
    private platform: Platform,
    private alertService: AlertService,
    private chatService: ChatService,
    public toastCtrl: ToastController,
    private router: Router,
    public modalCtrl: ModalController,
    private ionLoader: LoaderService,
    private route: ActivatedRoute
    ) {
      this.route.paramMap.subscribe( params => {
      this.id = params.get('id');
      console.log(this.id);
    });
  }



  public get isSubscribe(){
    return this.emergencies.isSubscribe;
  }
  async ngOnInit() {
    await this.platform.ready();
    await this.printCurrentPosition();
    await  this.getAlertByID(this.id);
      // Platform now ready, execute any required native code
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

        ionViewDidEnter(){
          this.createMap();
        }

        async printCurrentPosition() {
          this.coordinates = await Geolocation.getCurrentPosition();
          console.log('Current position:', this.coordinates);
        }

        getAlertByID(id){
           this.ionLoader.showLoader();
          this.handleAlert = this.alertService.getByIdWithoutFilter(id)
          .pipe(map((x: EmergenciesDisasters) => {
            x.isSubscribe = true;
            // x.isSubscribe = x.usersChatRooms.some(user => user.userID === this.currentUser.userID);
            this.alertService.setNewAlert(x);
        return x;
      }))
      .subscribe(
        (data) => {
          this.emergencies = data;
          this.createMap();
        console.log('Alerta by ID => ', data);
        this.isLoading = false;
         this.ionLoader.hideLoader();
    },
    (err) => {
      this.error = err;
        this.isLoading = false;
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

  async createMap() {
    const emergencies = this.emergencies;

    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
          lng: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
        },
        zoom: 15,
      },
      forceCreate: true,
    });

  await this.newMap.setMapType(MapType.Hybrid);
  await this.addMarkers();
  this.newMap.setOnMarkerClickListener(async (marker) => {

    const modal = await this.modalCtrl.create({
    component: DeploymentPage,
    componentProps: {
      emergencies: this.emergencies,
    },
    // breakpoints: [0, 0.2, 0.5, 1],
    // initialBreakpoint: 0.2,
  });
  return await modal.present();
  });

  }

  async addMarkers(){
    // if(!!this.markers){
    //   return;
    // }
    this.markers = await this.newMap.addMarkers([{
      snippet: 'Aqui estoy yo',
     title: 'Mi ubicacion' ,
    coordinate: {
      lat: this.coordinates.coords.latitude,
      lng: this.coordinates.coords.longitude,
    }
  },
{
      title: 'Alerta',
      snippet: this.emergencies.alerts.alertMessage ,
      coordinate: {
        lat: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
        lng: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      }
    }
]);
  }


   async showCurrentPosition() {}

  async moveMap(){
    if(this.mapState === 0){
      this.mapState = 1;
      this.newMap.setCamera({
        coordinate: {
          lat: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
          lng: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      },
        zoom: 12,
        bearing: 0
      });
    }
    else {
      this.mapState = 0;
      await this.newMap.setCamera({
        coordinate: {
        lat: this.coordinates.coords.latitude,
        lng: this.coordinates.coords.longitude,
      },
        zoom: 12,
        bearing: 0
      });
    }
  }


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

  ionViewDidLeave() {
    this.newMap.destroy();

  }

  ngOnDestroy(){
    this.handleAlert.unsubscribe();
    this.newMap.destroy();
  }
}

