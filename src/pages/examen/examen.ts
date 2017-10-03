import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {FinexamenPage} from '../finexamen/finexamen';

/**
 * Generated class for the ExamenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
  //Declarando la librería easytimer
//declare var Timer;
@IonicPage()
@Component({
  selector: 'page-examen',
  templateUrl: 'examen.html',
})
export class ExamenPage {
  // examen;
  testCheckboxOpen: boolean;
  testCheckboxResult;

  QA: boolean;
  QB: boolean;
  QC: boolean;
  QD: boolean;
  QE: boolean;
  @ViewChild(Slides) slides: Slides;

  //declare var Timer;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,) {
    // this.examen =navParams.data.users;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamenPage');
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Envio de respuestas !',
      subTitle: 'Ha finalizado su prueba calificada, gracias por participar!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertFin() {
    let alert = this.alertCtrl.create({
      title: 'Terminó el examen !',
      subTitle: 'Sus respuestas se guardarán',
      buttons: [{
        text: 'OK'/* ,

         handler: () => {
          document.getElementById("timer").innerHTML="30";
          }*/
      }
      ],

    });
    alert.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'se enviara sus respuestas ',
      message: 'No podra volver a enviar de nuevo sus respuestas.  si esta de acuerdo  Click  en  aceptar.',
      buttons: [
        {
          text: 'cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push(FinexamenPage);


          }
        }
      ]
    });
    confirm.present();

  }


  updateAnswer(bl, nq, letter: string) {
    if (bl == true) {
      console.log(nq);
      console.log(letter);
    }
    else {
      console.log('desactivado');

    }

  }


  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Enunciado de la pregunta de la Segunda Practica Calificada ?');

    alert.addInput({
      type: 'checkbox',
      label: 'Enunciado de respuesta 1',
      value: 'value1',
      // checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Enunciado de respuesta 2',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Enunciado de respuesta 3',
      value: 'value3'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Enunciado de respuesta 4',
      value: 'value4'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Enunciado de respuesta 5',
      value: 'value5'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;

      }
    });
    alert.present();
  }

  goToSlideX(n) {
    this.slides.slideTo(n);
    console.log(n);
  }
}
