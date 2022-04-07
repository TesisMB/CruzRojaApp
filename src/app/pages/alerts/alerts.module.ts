import { ComponentsModule } from './../../components/components.module';
import { VolunteersPage } from './../volunteers/volunteers.page';
import { AlertslayoutComponent } from './../../components/alertslayout/alertslayout/alertslayout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AlertsRoutingModule } from './alerts-routing.module';
import { VoluntariosDetallesPage } from '../volunteers/subpages/voluntarios-detalles/volunteersdetails';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    PipesModule,
    AlertsRoutingModule,
    ComponentsModule
  ],
  declarations: [
    VolunteersPage,
    VoluntariosDetallesPage,
    AlertslayoutComponent,
  ]
})


export class AlertsModule { }
