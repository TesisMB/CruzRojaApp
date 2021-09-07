import { VoluntariosDetallesPage } from './subpages/voluntarios-detalles/volunteersdetails';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteersPage } from './volunteers.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteersPage,
    children: [
      {
        path: 'details',
        component: VoluntariosDetallesPage
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntariosPageRoutingModule {}
