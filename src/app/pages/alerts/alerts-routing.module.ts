import { MapViewComponent } from './../../maps/components/map-view/map-view.component';
import { AlertslayoutComponent } from './../../components/alertslayout/alertslayout/alertslayout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsPage } from './alerts.page';
import { VolunteersPage } from '../volunteers/volunteers.page';
import { VoluntariosDetallesPage } from '../volunteers/subpages/voluntarios-detalles/volunteersdetails';
import { DeploymentPage } from '../deployment/deployment.page';

const routes: Routes = [
  {
    path: '',
    component: AlertslayoutComponent,

    children: [
      {
        path: '',
        component: AlertsPage
      },
      {
        path: 'deployment',
        component: DeploymentPage,
      },
      {
        path: 'volunteerMap',
        component: MapViewComponent,
      }

    ]
  },
      {
         path: 'emergency/:id',
         component: VolunteersPage,
         children: [
             {
               path: 'details/:id',
               component: VoluntariosDetallesPage
             },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
