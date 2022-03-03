import { AlertsPage } from './pages/alerts/alerts.page';
import { HomePageModule } from './pages/home/home.module';
import { DataResolverService } from './resolver/data-resolver.service';

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RoleName } from './models/RoleName';
import { LoginPage } from './pages/login/login.page';

const volunteersModule = () => import ('src/app/pages/voluntarios/volunteers.module').then(x => x.VolunteersPageModule);
const chatModule = () => import ('src/app/pages/chat/chat.module').then(x => x.ChatPageModule);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginPage,
  },

  {
    path: 'home',
    component: HomePageModule,
    canActivate: [AuthGuard]
  },

  {
    path: 'alertas',
    component: AlertsPage,
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
    path: 'volunteersdetails/id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './pages/voluntarios/volunteers.module'
  },

  {
    path: 'chat',
    loadChildren: chatModule
  },

  //Redirecciona a un 404, en cas ode que no exista una dirección
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

