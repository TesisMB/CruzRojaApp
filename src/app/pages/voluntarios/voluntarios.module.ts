import { DataService } from 'src/app/services/data.service';
import { VoluntariosDetallesPage } from './subpages/voluntarios-detalles/voluntarios-detalles.page';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoluntariosPage } from './voluntarios.page';
import { VoluntariosPageRoutingModule } from './voluntarios-routing.module';

@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntariosPageRoutingModule
  ],
  declarations: [
    VoluntariosPage,
    VoluntariosDetallesPage
  ],
  providers: [
  ]
})
export class VoluntariosPageModule {}
