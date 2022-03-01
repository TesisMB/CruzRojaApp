import { DataResolverService } from './resolver/data-resolver.service';
import { RoleName } from './models/RoleName';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';


//const ChatModule =
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
    component: AlertsPage,
    canActivate: [AuthGuard],
    data: {roles: [RoleName.Admin, RoleName.CoordinadorGeneral, RoleName.Voluntario, RoleName.CEyD]}
  },

  {
    path: 'voluntarios',
    loadChildren: () => import('src/app/pages/voluntarios/volunteers.module').then(m => m.VolunteersPageModule),
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
    loadChildren: () => import('src/app/pages/chat/chat.module').then(m => m.ChatPageModule)
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

