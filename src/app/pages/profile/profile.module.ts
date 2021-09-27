import { CuentaPage } from './subpages/cuenta/cuenta.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfilelayoutComponent } from 'src/app/components/profilelayout/profilelayout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [
    ProfilePage,
    CuentaPage,
    ProfilelayoutComponent
  ]
})
export class ProfilePageModule {}
