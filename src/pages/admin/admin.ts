import {Component} from '@angular/core';
import {LoadingController, NavController,IonicPage,NavParams,MenuController,AlertController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {ServiceProvider} from '../../providers/service/service';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})

export class AdminPage {
  // @ViewChild('mySlider') slider: Slides;
  // slides:any;
  users: any[];
  examen: any[];
  prueba: any[];
  loader: any;
  type: string;

  constructor(public navCtrl: NavController,
              public service: ServiceProvider,
              public loadingCtrl: LoadingController,
              private navParams: NavParams,
              public alertCtrl: AlertController,
              public menuCtrl:MenuController) {

        this.type = "";
    }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  irAlumnos(){
    this.type="listAlumnos";
    this.menuCtrl.close();
  }

  verExamenes(){
    this.type="examenes";
  }

  ViewIExamen(){
    this.type="cabeceraExamen";
    setTimeout(()=>{
      document.getElementById("pregunta_1").style.display="block";
    },0);
    
  }

  showRadio(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ir a la pregunta');
    for(var i=0;i<5;i++){
      alert.addInput({
        type: 'radio',
        label: 'Pregunta '+(i+1),
        value: ''+(i+1),
        checked: false
      });
    }
  
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        document.getElementById("pregunta_"+id).style.display="none";
        document.getElementById("pregunta_"+(data)).style.display="block";
      }
    });
    alert.present();
  }

  goBack(id){
    if(id>1){
      document.getElementById("pregunta_"+(id)).style.display="none";
      document.getElementById("pregunta_"+(id-1)).style.display="block";
    }
  }

  goForward(id){
    if(id<5){
      document.getElementById("pregunta_"+(id)).style.display="none";
      document.getElementById("pregunta_"+(id+1)).style.display="block";
    }
  }

  irCuestionarios(){
    this.type="listCuestionarios";
    this.menuCtrl.close();
  }

   irEmpezar(){
    this.type="empezarTest";
    this.menuCtrl.close();
  }

  eliminar() {
    let confirm = this.alertCtrl.create({
      title: '¿Estas seguro que deseas eliminar el cuestionario?',
      buttons: [
        {
          text: 'SI',
          handler: () => {
          }
        },
        {
          text: 'NO',
          handler: () => {
            //console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  back4(){
    this.type="listCuestionarios";
  }
}
