import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {AdminPage} from '../pages/admin/admin';
import {MyApp} from './app.component';
import {LoginPage} from '../pages/login/login';
import {InicioexamenPage} from '../pages/inicioexamen/inicioexamen';
import {ExamenPage} from '../pages/examen/examen';
//import {FinexamenPage} from '../pages/finexamen/finexamen';
import {ServiceProvider} from '../providers/service/service';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    InicioexamenPage,
    ExamenPage,
    //FinexamenPage,
    //AdminPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    InicioexamenPage,
    ExamenPage,
    //FinexamenPage,
    //AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {
}
