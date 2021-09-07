import { VoluntariosDetallesPage } from './subpages/voluntarios-detalles/volunteersdetails';
import { PipesModule } from '../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteersPage } from './volunteers.page';
import { VoluntariosPageRoutingModule } from './volunteers-routing.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntariosPageRoutingModule
  ],
  declarations: [
    VolunteersPage,
    VoluntariosDetallesPage
  ],
  providers: [
  ]
})
export class VolunteersPageModule {}
