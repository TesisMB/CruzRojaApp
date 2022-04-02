import { DataResolverService } from './resolver/data-resolver.service';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RoleName } from './models/RoleName';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { CuentaPage } from './pages/cuenta/cuenta.page';
import { DeploymentPage } from './pages/deployment/deployment.page';

const volunteersModule = () => import ('src/app/pages/voluntarios/volunteers.module').then(x => x.VolunteersPageModule);
const chatModule = () => import ('src/app/pages/chat/chat.module').then(x => x.ChatPageModule);
const alertsModule = () => import ('src/app/pages/alerts/alerts.module').then(x => x.AlertsModule);

const routes: Routes = [

  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginPage,
  },

  {
    path: 'alertas',
    loadChildren: alertsModule,
    canActivate: [AuthGuard],
    data: {roles: [RoleName.Admin, RoleName.CoordinadorGeneral, RoleName.Voluntario, RoleName.CEyD]}
  },

  {
    path: 'voluntarios',
    loadChildren: volunteersModule,
    canActivate: [AuthGuard],
    data: {roles: [RoleName.Admin, RoleName.CoordinadorGeneral, RoleName.CEyD]}
  },

  {
    path: 'chat',
    loadChildren: chatModule
  },

  {
    path: 'deployment',
    component: DeploymentPage,
  },

  {
    path: 'cuenta',
    component: CuentaPage,
  },

  //Redirecciona a un 404, en cas ode que no exista una dirección
  /* {
    path: '**',
    redirectTo: ''
  }, */

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

