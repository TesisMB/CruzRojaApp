import { PlacesService } from './../../../services/places/places.service';
import { EmergenciesDisasters } from './../../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, Input ,ElementRef, ViewChild  } from '@angular/core';
import { Location } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { Platform } from '@ionic/angular';
// import { GoogleMap, MapType } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LatLng } from '@capacitor-community/capacitor-googlemaps-native/dist/esm/types/common/latlng.interface';

@Component({
  selector: 'app-mapview',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements OnInit, OnDestroy  {
  @Input() emergencies: EmergenciesDisasters = null;
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  boundingRect: any;
   newMap: any;
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
    // public actionSheetController: ActionSheetController,
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
          this.handleAlert = this.alertService.getByIdWithoutFilter(id, false)
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

    this.boundingRect = this.mapRef.nativeElement.getBoundingClientRect() as DOMRect;

   this.newMap = CapacitorGoogleMaps.create({
      width: Math.round(this.boundingRect.width),
      height: Math.round(this.boundingRect.height),
      x: Math.round(this.boundingRect.x),
      y: Math.round(this.boundingRect.y),
      latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
      longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      zoom: 10
    });

    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: 'normal' // hybrid, satellite, terrain
      });

      await this.showCurrentPosition();

    });
    // this.newMap = await GoogleMap.create({
    //   id: 'my-cool-map',
    //   element: this.mapRef.nativeElement,
    //   apiKey: environment.apiKey,
    //   config: {
    //     center: {
    //       lat: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
    //       lng: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
    //     },
    //     zoom: 15,
    //   },
    //   forceCreate: true,
    // });

  //  await this.newMap.setMapType(MapType.None);
    // await this.addMarkers();
  }

//   this.newMap.addListener('onMapReady', async () => {
//     CapacitorGoogleMaps.setMapType({
  //       type: "normal" // hybrid, satellite, terrain
  //     });
//     this.showCurrentPosition();
//   });
// }

//   async addMarkers(){
//     // if(!!this.markers){
//     //   return;
//     // }
//     this.markers = await this.newMap.addMarkers([{
//       // title: 'Aqui estoy yo',
//       // snippet: 'Mi ubicacion' ,
//     coordinate: {
//       lat: this.coordinates.coords.latitude,
//       lng: this.coordinates.coords.longitude,
//     }
//   },
// {
//       // title: 'Alerta',
//       // snippet: this.emergencies.alerts.alertMessage ,
//       coordinate: {
//         lat: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
//         lng: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
//       }
//     }
// ]);
//   }
 async draw() {
    const points: LatLng[] = [
      {
        latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
        longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      },
      {
        latitude: this.coordinates.coords.latitude,
        longitude:this.coordinates.coords.longitude,
      }
    ];

    // const options: CircleOptions = {
    //   center: {
    //   latitude : this.emergencies.locationsEmergenciesDisasters.locationlatitude,
    //   longitude : this.emergencies.locationsEmergenciesDisasters.locationlongitude,
    // },
    //   radius: 300,
    //   strokeColor : '#AA00FF',
    //   strokeWidth: 5,
    //   fillColor : '#880000'
    // };
  //  await CapacitorGoogleMaps.addCircle(options);
   await CapacitorGoogleMaps.addPolyline({
      points,
      color: '#ff00ff',
      width: 2
    });
    await CapacitorGoogleMaps.addCircle({
      center: {
        latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
        longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      },
      radius: 1000,
       strokeColor: '#000000',
       fillColor: '#000000',
      //  strokeWidth: 5,
        zIndex: 1,
    });
  }

  async addCircle(){
    await CapacitorGoogleMaps.addCircle({
      center: {
        latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
        longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      },
      radius: 100,
      strokeColor: '#aa00ff',
      fillColor: '#aa00ff',
      strokeWidth: 10,
      zIndex: 1.0,
      visibility: true,
    });
  }

   async showCurrentPosition() {
      Geolocation.requestPermissions().then(async premission => {
        const coordinates = await Geolocation.getCurrentPosition();
        this.coordinates = coordinates;
        // Create our current location marker
        CapacitorGoogleMaps.addMarker({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
          title: 'Mi posicion actual',
          snippet: 'Aquí estoy parado!'
        });

        CapacitorGoogleMaps.addMarker({
          latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
          longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
          title: this.emergencies.alerts.alertMessage,
          snippet: 'Esta es la emergencia'
        });
        // Focus the camera
        CapacitorGoogleMaps.setCamera({
          latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
          longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
          zoom: 12,
          bearing: 0
        });
      await this.draw();
      });
    }

  async moveMap(){
    if(this.mapState === 0){
      this.mapState = 1;
      CapacitorGoogleMaps.setCamera({
        latitude: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
        longitude: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
        zoom: 12,
        bearing: 0
      });
    }
    else {
      this.mapState = 0;
      await CapacitorGoogleMaps.setCamera({
        latitude: this.coordinates.coords.latitude,
        longitude: this.coordinates.coords.longitude,
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

  async presentActionSheet() {
      const result = await ActionSheet.showActions({
        title: 'Photo Options',
        message: 'Select an option to perform',
        options: [
          {
            title: 'Upload',
          },
          {
            title: 'Share',
          },
          {
            title: 'Cancel',
            style: ActionSheetButtonStyle.Cancel,
          },
        ],
      });
      console.log('Action Sheet result:', result);
  }

  navigateVolunteer(){
    this.router.navigate(['emergency/',  this.emergencies.emergencyDisasterID]);
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();

  }

  ngOnDestroy(){
    this.handleAlert.unsubscribe();
    CapacitorGoogleMaps.close();
  }
}
/* async showToast(msg: string, duration: number) {
  // this.toastCtrl.dismiss();
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: duration,
  });
  await toast.present();
} */

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

