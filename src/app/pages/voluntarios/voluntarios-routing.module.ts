import { VoluntariosDetallesPage } from './subpages/voluntarios-detalles/voluntarios-detalles.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntariosPage } from './voluntarios.page';

const routes: Routes = [
  {
    path: '',
    component: VoluntariosPage,
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
