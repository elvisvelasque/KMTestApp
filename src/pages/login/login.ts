import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AdminPage} from '../admin/admin';
import {HomePage} from '../home/home';
import {ServiceProvider} from '../../providers/service/service';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  alumnos: any[];
  loader: any;
  Email;
  codigoUni;
  FormLoginE;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public service: ServiceProvider,
              public alertCtrl: AlertController) {
    this.Email = "";
    this.codigoUni = "";
  }

  login(FormLogin) {
    this.service.login(FormLogin.value).subscribe(data => {
      if (data.succes === true) {
        this.navCtrl.setRoot(HomePage);
      } else {
        let alert = this.alertCtrl.create({
          title: 'login falled',
          subTitle: data.messeage,
          buttons: ['OK']
        })
        alert.present();
      }
    })
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 600
    });
    loader.present();
    if (this.FormLoginE == "admin") {
      this.navCtrl.push(AdminPage);
    }
    else {
      this.navCtrl.push(HomePage);
    }
  }

  EnDataLocal() {
    this.presentLoading();
    this.service.getLocalData().subscribe(
      data => {
        this.alumnos = data;
        console.log(data);
        this.loader.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('datos competos')
    );
  }


}
