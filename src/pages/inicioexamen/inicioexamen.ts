import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ExamenPage} from '../examen/examen';

/**
 * Generated class for the InicioexamenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicioexamen',
  templateUrl: 'inicioexamen.html',
})
export class InicioexamenPage {
  examen: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioexamenPage');
  }

  DarExamen() {
    this.navCtrl.push(ExamenPage);

  }


}
