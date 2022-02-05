import { DataResolverService } from './resolver/data-resolver.service';
import { AlertsPage } from './pages/alerts/alerts.page';
import { RoleName } from './models/RoleName';
import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';

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
    path: 'forgotpassword',
    loadChildren: () => import('./pages/login/forgotpassword/forgotpassword.module')
    .then( m => m.ForgotpasswordPageModule)
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
    loadChildren: './pages/voluntarios/volunteers.module',
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

  {
    path: 'profile',
    component: ProfilePage,
  },

  //Redirecciona a un 404
  {
    path: '**',
    redirectTo: ''
  },  {
    path: 'deployment',
    loadChildren: () => import('./pages/deployment/deployment.module').then( m => m.DeploymentPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

