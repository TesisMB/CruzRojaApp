import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { ActionSheetController } from '@ionic/angular';

import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

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
  constructor(
    private chatService: ChatService,
    public toastCtrl: ToastController,
    private router: Router,
    public actionSheetController: ActionSheetController,

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

  ionViewDidLeave() {
  }

  ngOnDestroy(){
  }
}

