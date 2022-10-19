import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { MenuPage } from './pages/menu/menu.page';
import { ForgotpasswordPage } from './pages/login/forgotpassword/forgotpassword.page';

const chatModule = () => import ('src/app/pages/chat/chat.module').then(x => x.ChatPageModule);
const alertsModule = () => import ('src/app/pages/alerts/alerts.module').then(x => x.AlertsModule);
const accountModule = () => import ('src/app/pages/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'tabs',
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePage,
        canActivate: [AuthGuard]
      },
      {
        path: 'alertas',
        children: [
          {
            path: '',
            loadChildren: alertsModule,
            canActivate: [AuthGuard],
          }
        ]
      },
       {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: chatModule,
            canActivate: [AuthGuard],
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: accountModule,
            canActivate: [AuthGuard],
          }
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordPage
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tabs'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

