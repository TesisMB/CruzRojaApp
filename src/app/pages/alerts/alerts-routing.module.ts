import { MapViewComponent } from './../../maps/components/map-view/map-view.component';
import { AlertslayoutComponent } from './../../components/alertslayout/alertslayout/alertslayout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsPage } from './alerts.page';
import { VolunteersPage } from '../volunteers/volunteers.page';
import { VoluntariosDetallesPage } from '../volunteers/subpages/voluntarios-detalles/volunteersdetails';
import { DeploymentPage } from '../deployment/deployment.page';
import { MapScreenComponent } from 'src/app/maps/screens/map-screen/map-screen.component';

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
        path: 'alerta/:id',
        component: MapScreenComponent,
        children: [
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
      {
        path: 'volunteerMap',
        component: MapViewComponent,
      }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertsRoutingModule {}
