import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeploymentPageRoutingModule } from './deployment-routing.module';

import { DeploymentPage } from './deployment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeploymentPageRoutingModule
  ],
  declarations: [DeploymentPage]
})
export class DeploymentPageModule {}
