
export function getToken() {
  return localStorage.getItem('currentUser');
}

import { HttpInterceptorService } from './_helpers/http.interceptor.service';
import { VolunteersPageModule } from './pages/voluntarios/volunteers.module';
import { MenuPage } from './pages/menu/menu.page';
import { AlertsPage } from './pages/alerts/alerts.page';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';

import { PipesModule } from './pipes/pipes.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule} from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';

//SharedModule
import { SharedModule } from './shared/shared.module';

//Interceptor

import { AuthInterceptorService } from './_helpers/auth-interceptor.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChatPage } from './pages/chat/chat.page';


@NgModule({
  declarations: [AppComponent, LoginPage, AlertsPage, ChatPage, HomePage, MenuPage],
  entryComponents: [],

  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    VolunteersPageModule,
    NgbModule,
    SharedModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
    }
  }),
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      //Permite agregar más interceptor y no reutilizar el mismo interceptor
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      //Permite agregar más interceptor y no reutilizar el mismo interceptor
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
