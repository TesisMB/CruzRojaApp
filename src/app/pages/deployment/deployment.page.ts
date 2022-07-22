import { PlacesService } from './../../services/places/places.service';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, Input ,ElementRef, ViewChild  } from '@angular/core';
import { Location } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { ActionSheetController } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.css'],
})
export class DeploymentPage implements OnInit, OnDestroy  {
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
    public actionSheetController: ActionSheetController,
    private placesService: PlacesService,
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
  ionViewWillEnter(){
          // this.ionLoader.showLoader();

        }

        ionViewDidEnter(){
          // this.createMap();
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

    // CapacitorGoogleMaps.addListener('onMapReady', async () => {
    //   CapacitorGoogleMaps.setMapType({
    //     type: 'normal' // hybrid, satellite, terrain
    //   });

    //   await this.showCurrentPosition();

    // });
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
  }

//   this.newMap.addListener('onMapReady', async () => {
//     CapacitorGoogleMaps.setMapType({
  //       type: "normal" // hybrid, satellite, terrain
  //     });
//     this.showCurrentPosition();
//   });
// }

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


   async showCurrentPosition() {
      // Geolocation.requestPermissions().then(async premission => {
      //   const coordinates = await Geolocation.getCurrentPosition();
      //   this.coordinates = coordinates;
      //   // Create our current location marker
      //   CapacitorGoogleMaps.addMarker({
      //     latitude: coordinates.coords.latitude,
      //     longitude: coordinates.coords.longitude,
      //     title: 'Mi posicion actual',
      //     snippet: 'Aquí estoy parado!'
      //   });

      //   CapacitorGoogleMaps.addMarker({
      //     latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
      //     longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      //     title: this.emergencies.alerts.alertMessage,
      //     snippet: 'Esta es la emergencia'
      //   });
      //   // Focus the camera
      //   CapacitorGoogleMaps.setCamera({
      //     latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
      //     longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      //     zoom: 12,
      //     bearing: 0
      //   });
      // });
    }

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

  getPlacesByQuery(){
    this.placesService.getAll()
    .subscribe(resp => {

      console.log('Ubicaciones:', resp);
      /* this.isLoadingPlaces = false;
      this.places = resp.features;

      this.mapService.createMarkersFromPlaces(this.places); */
    });
  }


  async showToast(msg: string, duration: number) {
    // this.toastCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: msg,
      duration,
    });
    await toast.present();
  }

  // async presentActionSheet() {
  //     const result = await ActionSheet.showActions({
  //       title: 'Photo Options',
  //       message: 'Select an option to perform',
  //       options: [
  //         {
  //           title: 'Upload',
  //         },
  //         {
  //           title: 'Share',
  //         },
  //         {
  //           title: 'Cancel',
  //           style: ActionSheetButtonStyle.Cancel,
  //         },
  //       ],
  //     });
  //     console.log('Action Sheet result:', result);
  // }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Play (open modal)',
          icon: 'caret-forward-circle',
          handler: () => {
            console.log('Play clicked');
          },
        },
        {
          text: 'Favorite',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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

