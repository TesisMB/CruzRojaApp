import { AlertasPage } from './pages/alertas/alertas.page';
import { RoleName } from './models/RoleName';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ChatPage } from './pages/chat/chat.page';
import { ProfilePage } from './pages/profile/profile.page';

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
    component: HomePage,
    canActivate: [AuthGuard]
  },

  {
    path: 'alertas',
    component: AlertasPage,
    canActivate: [AuthGuard],
    data: {roles: [RoleName.Admin, RoleName.CoordinadorGeneral, RoleName.Voluntario, RoleName.CEyD]}
  },

  {
    path: 'voluntarios',
    loadChildren: () => import('./pages/voluntarios/voluntarios.module').then( m => m.VoluntariosPageModule),
    canActivate: [AuthGuard],
    data: {roles: [RoleName.Admin, RoleName.CoordinadorGeneral, RoleName.CEyD]}
  },

  {
    path: 'chat',
    component: ChatPage,
    canActivate: [AuthGuard],
    data: {roles: [RoleName.Admin, RoleName.CoordinadorGeneral, RoleName.Voluntario, RoleName.CEyD]}
  },

  {
    path: 'profile',
    component: ProfilePage,
  },

  //Redirecciona a un 404
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

