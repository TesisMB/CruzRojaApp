import { EmergenciesDisasters } from './../../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy, Input ,ElementRef, ViewChild  } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform, ModalController } from '@ionic/angular';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';


import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Observable, Subscription } from 'rxjs';
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
  handleDeployment: Subscription;
  isAccepted = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  isLoading = true;
  id = null;
  error: any = '';
  handleAlert: Subscription;
  quantity: Observable<number>;

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
            // x.isSubscribe = true;
            x.isSubscribe = x.chatRooms.usersChatRooms.some(user => user.userID === this.currentUser.userID);
            this.alertService.setNewAlert(x);
        return x;
      }))
      .subscribe(
        (data) => {
          this.emergencies = data;
          this.chatService.setQuantity(data.quantity);
          this.quantity = this.chatService.quantity$;
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


  async createMap() {

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

  await this.newMap.setMapType(MapType.Normal);
  await this.addMarkers();
  await this.createModal();
  this.newMap.setOnMarkerClickListener(async (marker) => {
    console.log(marker);
  });

  }

  async addMarkers(){
    // if(!!this.markers){
    //   return;
    // }
    this.markers = await this.newMap.addMarkers([{
      // snippet: 'Aqui estoy yo',
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

  async createModal(){
    const modal = await this.modalCtrl.create({
      component: DeploymentPage,
      componentProps: {
        emergencies: this.emergencies,
      },
      breakpoints: [0, 0.2, 0.5, 1],
      initialBreakpoint: 0.1,
    });
    return await modal.present();
  }

  async showCurrentPosition() {}

  async moveMap(){
    if(this.mapState === 1){
      this.mapState = 0;
      this.newMap.setCamera({
        coordinate: {
          lat: this.emergencies.locationsEmergenciesDisasters.locationlatitude,
          lng: this.emergencies.locationsEmergenciesDisasters.locationlongitude,
      },
        zoom: 15,
        bearing: 0
      });
    }
    else {
      this.mapState = 1;
      await this.newMap.setCamera({
        coordinate: {
        lat: this.coordinates.coords.latitude,
        lng: this.coordinates.coords.longitude,
      },
        zoom: 15,
        bearing: 0
      });
    }
  }

  navigateMemberList(){
    this.router.navigate(['memberlist/', this.id]);
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

/*   ionViewDidLeave() {
    this.newMap.destroy();
    console.log('ionViewDidLeave');
  } */

  ngOnDestroy(){
     this.handleAlert.unsubscribe();
     this.newMap.destroy();
    // console.log('ngOnDestroy');
  }
}

