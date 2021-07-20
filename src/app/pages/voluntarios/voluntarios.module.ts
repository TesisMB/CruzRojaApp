import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoluntariosPageRoutingModule } from './voluntarios-routing.module';

import { VoluntariosPage } from './voluntarios.page';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntariosPageRoutingModule
  ],
  declarations: [VoluntariosPage]
})
export class VoluntariosPageModule {}
