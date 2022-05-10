

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RoleName } from './models/RoleName';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { AccountPage } from './pages/account/account.page';

const chatModule = () => import ('src/app/pages/chat/chat.module').then(x => x.ChatPageModule);
const alertsModule = () => import ('src/app/pages/alerts/alerts.module').then(x => x.AlertsModule);

const routes: Routes = [

  {
    path: 'home',
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
    path: 'chat',
    loadChildren: chatModule
  },

  {
    path: 'account',
    component: AccountPage,
  },

  //Redirecciona a un 404, en caso de que no exista una dirección
  {
    path: '**',
    redirectTo: 'home',
  },
/*   {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  }, */


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

