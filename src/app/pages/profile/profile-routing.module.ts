import { CuentaPage } from './subpages/cuenta/cuenta.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import { ProfilelayoutComponent } from 'src/app/components/profilelayout/profilelayout.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilelayoutComponent,
    children: [
      {
        path: 'cuenta',
        component: CuentaPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
