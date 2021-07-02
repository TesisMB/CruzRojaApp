export function getToken() {
  return localStorage.getItem('currentUser');
}
import { MenuPage } from './pages/menu/menu.page';
import { AlertasPage } from './pages/alertas/alertas.page';
import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule} from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { ChatPage } from './pages/chat/chat.page';
import { HomePage } from './pages/home/home.page';
import { JwtModule } from '@auth0/angular-jwt';
//Interceptor
import { AuthInterceptorService } from './_helpers/auth-interceptor.service';
@NgModule({
  declarations: [AppComponent, LoginPage, AlertasPage, ChatPage, HomePage, MenuPage],
  entryComponents: [],
  
  imports: [
    HttpClientModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    NgbModule, 
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(), 
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
    } 
    }),
],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      //Permite agregar más interceptor y no reutilizar el mismo interceptor
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
