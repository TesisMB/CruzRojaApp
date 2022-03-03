import { DeploymentPage } from './index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsPage } from './index';
import { VolunteersPage } from './index';
import { ChatPage } from './index';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AlertsPage,
    VolunteersPage,
    ChatPage,
    DeploymentPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class SharedModule { }
