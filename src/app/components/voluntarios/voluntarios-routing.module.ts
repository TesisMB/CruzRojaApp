import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoluntariosPage } from './voluntarios.page';

const routes: Routes = [
  {
    path: '',
    component: VoluntariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntariosPageRoutingModule {}
