import { PlacesService } from './../../services/places/places.service';
import { EmergenciesDisasters } from './../../models/EmergenciesDisasters';
import { ChatService } from 'src/app/services/chat/chat.service';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deployment',
  templateUrl: './deployment.page.html',
  styleUrls: ['./deployment.page.css'],
})
export class DeploymentPage implements OnInit, OnDestroy {

  handleDeployment: any;
  emergencies: EmergenciesDisasters = null;
  handlerChat: any;
  isAccepted: boolean = false;

  constructor(
    private alertService: AlertService,
    private chatService: ChatService,
    private location: Location,
    private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.handleDeployment = this.alertService._currentAlert.subscribe(
      data =>{
        this.emergencies = data;
        console.log(data);
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

  ngOnDestroy(){
    this.handleDeployment.unsubscribe();
  }

}
