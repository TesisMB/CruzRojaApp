import { ComponentsModule } from './../../components/components.module';
import { VolunteersPage } from './../volunteers/volunteers.page';
import { AlertslayoutComponent } from './../../components/alertslayout/alertslayout/alertslayout.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AlertsRoutingModule } from './alerts-routing.module';
import { VoluntariosDetallesPage } from '../volunteers/subpages/voluntarios-detalles/volunteersdetails';
import { DeploymentPage } from '../deployment/deployment.page';
import { AlertsPage } from './alerts.page';
import { MapViewComponent } from 'src/app/maps/components/map-view/map-view.component';
import { MapScreenComponent } from 'src/app/maps/screens/map-screen/map-screen.component';


@NgModule({
  imports: [
    SharedModule,
    PipesModule,
    AlertsRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    AlertsPage,
    DeploymentPage,
    MapViewComponent,
    AlertslayoutComponent,
    MapScreenComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AlertsModule { }
