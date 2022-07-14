import { RoleName } from './../../models/RoleName';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { TypeEmergenciesDisasters } from './../../models/TypeEmergenciesDisasters';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, IonList, IonSlides, ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alertas',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.css']
})

export class AlertsPage implements OnInit {

  alerts: EmergenciesDisasters[] = [];
  alertstypes: TypeEmergenciesDisasters[] = [];
  role: RoleName;
  isControlled = false;
  estilo = '';
  handlerAlerts: any;
  handlerAlertsTypes: any;
  currentUser: any;
  id= null;
  isLoading = true;
  error: any = '';
  constructor(
    private alertService: AlertService,
    private router: Router,
    private ionLoader: LoaderService,
    public toastCtrl: ToastController,

  ) { }

  ionViewWillEnter() { // or you can use ionViewWillEnter()
    this.ionLoader.showLoader();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getAllAlerts(false);
  }

//  ionViewDidEnter() {
//      this.ionLoader.hideLoader();
//  }
  ngOnInit() {
  }
  segmentChanged(ev: any) {
    const val = (ev.detail.value === 'true');
    console.log('valor => ',val);
    this.getAllAlerts(val);
  }
  getAllAlerts(condition){
    this.isLoading = true;
    this.handlerAlerts = this.alertService.getAll()
    .pipe(map((a: EmergenciesDisasters[]) => {
      a.forEach((x: EmergenciesDisasters) => {
        x.isSubscribe = x.usersChatRooms.some(user => user.userID === this.currentUser.userID);
      });
      const alerts = a.filter( f => f.isSubscribe === condition);
      this.alertService.setAlerts(alerts);
      return alerts;
    }))
    .subscribe((x: EmergenciesDisasters[]) =>{
    this.alerts = x;
     console.log('Alerta =>', x);
     this.isLoading = false;
     this.ionLoader.hideLoader();
   },
   (err) => {
    this.error = err;
    this.isLoading = false;
    this.showToast('Error al cargar los datos :(',3000);
    this.ionLoader.hideLoader();
   });
  }

  /* Función para cuando se active el boton, se abre el slide para la derecha */

  async showToast(msg: string, duration: number) {
    // this.toastCtrl.dismiss();
    const toast = await this.toastCtrl.create({
      message: msg,
      duration,
    });
    await toast.present();
  }

  deploymentButton(index){
    this.alertService.setNewAlert(this.alerts[index]);
    this.router.navigate(['alerta', this.alerts[index].emergencyDisasterID]);
    // this.id = index;
    //  this.ionLoader.showLoader();
  }

  /* Función para usar el color  */

  getColor(color: string){
    if(color ==='Moderado'){
      return '#d8db2f';
    } else if (color ==='Urgente'){
      return '#d83a35';
      }
    else if (color === 'Controlado'){
      return '#4cd137';
    }
  }
}
