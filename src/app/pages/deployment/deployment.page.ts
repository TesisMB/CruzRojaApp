import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { ActionSheetController } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.css'],
})
export class DeploymentPage implements OnInit, OnDestroy  {
  @Input() emergencies: EmergenciesDisasters = null;
  currentUser;
  handleDeployment: Subscription;
  handlerChat: Subscription;
  error: any = '';
  isLoading = false;
  constructor(
    private chatService: ChatService,
    public toastCtrl: ToastController,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private ionLoader: LoaderService,

    ) { }

  public get isSubscribe(){
    return this.emergencies.isSubscribe;
  }
  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  navigateVolunteer(){
    this.router.navigate(['emergency/',  this.emergencies.emergencyDisasterID]);
  }

  setChatGroup(){
    this.isLoading = true;
    // this.ionLoader.showLoader();
    console.log(this.emergencies);
    this.handlerChat = this.chatService.joinGroup(this.emergencies.emergencyDisasterID)
    .subscribe(
    (data) =>{
      console.log('Aceptado');
      this.emergencies.isSubscribe = true;
      // this.ionLoader.hideLoader();
      this.isLoading = false;
      this.showToast('Felicidades! Se le ha creado un chat de la alerta', 3000);
},
    (error) =>{
    console.log('error', error);
     this.ionLoader.hideLoader();
     this.showToast('Usted ya esta registrado en esta alerta', 3000);
    //  this.isAccepted = true;
     this.isLoading = false;
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

  ionViewDidLeave() {
  }

  ngOnDestroy(){
  }
}

