import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {HomePage} from '../pages/home/home';
import {InicioexamenPage} from '../pages/inicioexamen/inicioexamen';
import {ExamenPage} from '../pages/examen/examen';
//import {FinexamenPage} from '../pages/finexamen/finexamen';
import {ServiceProvider} from '../providers/service/service';


declare var Timer: any;


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, component: any }>

  constructor(public platform: Platform,
              public  statusBar: StatusBar,
              public  splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              private service: ServiceProvider) {
    //si el usuario está logeado, la página raíz es loginPage, de lo contrario seria HomePage
    if (this.service.isLogged() === false) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = HomePage;
    }

    this.initializeApp();

    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'inicioExamen', component: InicioexamenPage},
      {title: 'examen', component: ExamenPage},
      //{title: 'finexamen', component: FinexamenPage},
      {title: 'salir', component: LoginPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

//   openMenu() {
//    this.menuCtrl.open();
//  }

//  closeMenu() {
//    this.menuCtrl.close();
//  }

//  toggleMenu() {
//    this.menuCtrl.toggle();
//  }
}

