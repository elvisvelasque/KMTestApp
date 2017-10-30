import { Component, ViewChild } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
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

  loading: Loading;
  registerCredentials = {username: '', password: ''};
  alumnos: any[];
  loader: any;
  Email;
  codigoUni;
  FormLoginE;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              public service: ServiceProvider,
              public alertCtrl: AlertController) {
  }

  public login() {
    this.showLoading();

    this.service.login(this.registerCredentials).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.navCtrl.setRoot('HomePage',{data:res});
      } else {
        this.showError("Access Denied");
      }
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

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
