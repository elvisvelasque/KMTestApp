import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LoadingController, NavController, IonicPage, NavParams, AlertController, MenuController, Slides } from 'ionic-angular';

import { InicioexamenPage } from '../inicioexamen/inicioexamen';
import { LoginPage } from '../login/login';
import { ServiceProvider } from '../../providers/service/service';
import { TimerComponent } from '../timer/timer'
import { TestPendiente } from '../../model/TestPendiente';
import { Pregunta } from '../../model/Pregunta';
import { Resultados } from '../../model/Resultados';
import { AdminPage } from '../admin/admin';


export class rptaAlumno {//despues seras eliminado
  id_question: number;
  answer_student: number;
  constructor(id_question: number, answer_student: number) {
    this.id_question = id_question;
    this.answer_student = answer_student;
  }
}

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //styleUrls:['pages/home/home.css'] no funciona
})

export class HomePage {
  @ViewChild(TimerComponent) timer: TimerComponent;
  @ViewChild(Slides) slides: Slides;

  users: any[];
  loader: any;
  type: string;
  type2: string;
  data: string;
  examen: TestPendiente[] = [];
  idPregunta: number = 1;
  preguntas: Pregunta[] = [];
  answerStudent: number[] = [];
  respuestasAlumno: rptaAlumno[] = [];//despues seras eliminado
  estilosIniciales: Object[] = [];
  resultados:Resultados=null;

  attempt: number = 0;

  nombreExamen: string = "";
  number_questions: number = 0;
  correct_points: number = 0;
  error_points: number = 0;
  start_datetime: string = "";
  end_datetime: string = "";
  attempts_allowed: number = 0;
  duration_time: number = 0;
  id: number = 0;

  numRspndidas: number = 0;
  numBlancos: number = 0;
  puntajeFinal: number = 0;

  duracionExamen: number = 0;

  Institucion: string = "";
  misInstituciones: Object[] = [];
  Locaciones: string = "";
  misLocaciones: Object[] = [];
  miperfil = { pnombres: '', papellidos: '', pemail: '', pnumTel: '', pnumcell: '', pnumDoc: '', pcumpleanios: '', plocaciones: '', pdireccion: '', pgenero: '', pInstitucion: '' };

  mySlideOptions = {
    initialSlide: 1,
    loop: true
  };

  constructor(public navCtrl: NavController,
    private navParams: NavParams,
    public service: ServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {

    this.type = "pendiente";
    this.type2 = "inicio";
    this.data = this.navParams.get('data');//datos token pasados a la vista home
    this.examenPendiente();//muestra los examenes pendientes
  }
  //extrayendo la data de examenes
  examenPendiente() {
    this.examen = [];
    this.service.getDataExamenLocal(this.data["data"]["session_id"]).subscribe(
      data => {
        let tests = data["data"];
        for (var i = 0; i < tests.length; i++) {
          this.examen.push(new TestPendiente(tests[i]["id"], tests[i]["course_period_id"], tests[i]["name"], tests[i]["subject"], tests[i]["start_datetime"], tests[i]["end_datetime"], tests[i]["questions_count"], tests[i]["correct_points"], tests[i]["error_points"], tests[i]["attempts_allowed"], tests[i]["duration_time"]));
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  //informacion del examen
  ViewIExamen(exam) {

    //this.service.attempt(this.data["token"],exam.id).subscribe( //para saber si ya tomo o no el examen

      //data=>{
        //if(data["success"]==false){
          //this.intentoExamen()
        //}else{
          //this.navCtrl.push(InicioexamenPage);
     /*     this.type="examenPendiente";
          this.type2="";
          this.nombreExamen = exam.name;
          this.number_questions = exam.number_questions;
          this.correct_points = exam.correct_points;
          this.error_points = exam.error_points;
          this.start_datetime = exam.start_datetime;
          this.end_datetime = exam.end_datetime;
          this.attempts_allowed = exam.attempts_allowed;
          this.duration_time = exam.duration_time;
          this.id=exam.id;
          this.preguntas=[];
          this.service.getPreguntas(this.data["data"]["session_id"],exam.id).subscribe(
            data => {
              console.log(data["data"]);
              let tests = data["data"];
              for(var i=0;i<tests.length;i++){
                this.preguntas.push(new Pregunta(i+1,tests[i]["topic_id"],1,tests[i]["statement"]["text"],"picture",tests[i]["statement"]["alternatives"][0]["text"],tests[i]["statement"]["alternatives"][1]["text"],tests[i]["statement"]["alternatives"][2]["text"],tests[i]["statement"]["alternatives"][3]["text"],tests[i]["statement"]["alternatives"][4]["text"],1,4,2));
              }
              console.log(this.preguntas);
              setTimeout(()=>{
                document.getElementById("darExamen").removeAttribute("disabled");
              },0);
            },
            err => {
              console.log(err);
            }
          );
        //}
      //} */

    //data=>{
    //if(data["success"]==false){
    //this.intentoExamen()
    //}else{
    //this.navCtrl.push(InicioexamenPage);
    this.type = "examenPendiente";
    this.type2 = "";
    this.nombreExamen = exam.name;
    this.number_questions = exam.number_questions;
    this.correct_points = exam.correct_points;
    this.error_points = exam.error_points;
    this.start_datetime = exam.start_datetime;
    this.end_datetime = exam.end_datetime;
    this.attempts_allowed = exam.attempts_allowed;
    this.duration_time = exam.duration_time;
    this.id = exam.id;
    this.preguntas = [];
    this.service.getPreguntas(this.data["data"]["session_id"], exam.id).subscribe(
      data => {
        console.log(data["data"]);
        let tests = data["data"];
        for (var i = 0; i < tests.length; i++) {
          this.preguntas.push(new Pregunta(i + 1, tests[i]["id"], tests[i]["name"], tests[i]["evaluation_id"], tests[i]["statement"]["text"], tests[i]["statement"]["pictures"][0], tests[i]["statement"]["alternatives"][0]["text"], tests[i]["statement"]["alternatives"][1]["text"], tests[i]["statement"]["alternatives"][2]["text"], tests[i]["statement"]["alternatives"][3]["text"], tests[i]["statement"]["alternatives"][4]["text"]));
          this.answerStudent[i] = 0;
        }
        
        setTimeout(() => {
          document.getElementById("darExamen").removeAttribute("disabled");
        }, 0);
      },
      err => {
        console.log(err);
      }
    );
    //}
    //}

    //);
  }

  saveQuestion(id) {
    //console.log(this.data["data"]["session_id"] + "--" + this.attempt + "--" + this.preguntas[id - 1]["id_remote"] + "--" + this.answerStudent);
    this.service.saveQuestion(this.data["data"]["session_id"], this.attempt, this.preguntas[id - 1]["id_remote"], this.answerStudent[id-1]).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  Duracion(start, end) {
    let inicio = new Date(start);
    let fin = new Date(end);
    let secini = inicio.getUTCHours() * 3600 + inicio.getUTCMinutes() * 60 + inicio.getUTCSeconds();
    let secfin = fin.getUTCHours() * 3600 + fin.getUTCMinutes() * 60 + fin.getUTCSeconds();
    let result = secfin - secini;
    return this.getTime(result);
  }

  DuracionActual(end) {
    let inicio = new Date();//el inicio debe tener la hora del dispositivo o del servidor?????
    let fin = new Date(end);
    let inicioSec = inicio.getHours() * 3600 + inicio.getMinutes() * 60 + inicio.getSeconds();
    let finSec = fin.getUTCHours() * 3600 + fin.getUTCMinutes() * 60 + fin.getUTCSeconds();
    return inicioSec - finSec;
  }

  getTime(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    return this.addo(hours) + ":" + this.addo(minutes) + ":" + this.addo(seconds);
  }

  DuracionAlumnoExamen() {//cuanto le tomo al alumno dar el examen;
    let secini = this.inicioExamen.getUTCHours() * 3600 + this.inicioExamen.getUTCMinutes() * 60 + this.inicioExamen.getUTCSeconds();
    let secfin = this.finExamen.getUTCHours() * 3600 + this.finExamen.getUTCMinutes() * 60 + this.finExamen.getUTCSeconds();
    let result = secfin - secini;
    return this.getTime(result);
  }

  cambio(horadia) {
    let format = new Date(horadia);
    return this.addo(format.getUTCHours()) + ":" + this.addo(format.getUTCMinutes()) + ":" + this.addo(format.getUTCSeconds());
  }
  getFecha(horadia) {
    let format = new Date(horadia);
    return this.addo(format.getUTCFullYear()) + "-" + this.addo(format.getUTCMonth()) + "-" + this.addo(format.getUTCDate());
  }
  addo(comp) {
    return (((comp + "").length == 1) ? "0" + comp : comp);
  }

  back() {
    this.type2 = "inicio";
    this.type = "pendiente";
    this.nombreExamen = "";
    this.number_questions = 0;
    this.correct_points = 0;
    this.error_points = 0;
    this.start_datetime = "";
    this.end_datetime = "";
    this.id = 0;
  }


  back2() {
    this.type2 = "inicio";
    this.type = "pendiente";
    this.number_questions = 0;
    this.numRspndidas = 0;
    this.numBlancos = 0;
    this.puntajeFinal = 0;
    this.id = 0;

  }

  finalizo() {
    setTimeout(() => {
      if (this.type != "cabeceraExamen") return;
      else if (!this.timer.hasFinished()) this.finalizo();
      else {
        this.saveQuestion(this.posicion);
        this.finalizarExamen(this.data["data"]["session_id"], this.attempt);
        this.presentAlert();
        this.finExamen = new Date();
      }
    }, 1000)
  }

  inicioExamen: Date = null;

  DarExamen(id) {
    this.service.attempt(this.data["data"]["session_id"], id).subscribe(
      data => {
        if (data["success"] == false) {
          this.intentoExamen()
        } else {
          console.log(data);
          this.attempt = data["data"]["id"];
          this.presentLoading();
          this.type = "cabeceraExamen";
          this.duracionExamen = this.duration_time;
          this.inicioExamen = new Date();
          setTimeout((result) => {//inicia el contador del examen
            this.timer.startTimer();
            this.finalizo();//saber si acabo el tiempo
          }, 1000);
          setTimeout(() => {
            document.getElementsByClassName("botonTerminar")[this.preguntas.length - 1].removeAttribute("style");
            document.getElementsByClassName("botonTerminar")[this.preguntas.length - 1].setAttribute("style", "display:block");
          }, 0)
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  finalizarExamen(session, attempt) {
    console.log(session,attempt);
    this.service.finalizarExamen(session, attempt).subscribe(
      data => {
          console.log(data);
      }, err => {
        console.log(err);
      }
    );
  }

  posicion: number = 1;
  goBack(id) {
    if (id > 1) {
      this.slides.slideTo(id - 2, 500);
      this.posicion = id - 1;
      //this.saveQuestion(id);
    }
  }

  goForward(id) {
    if (id < this.preguntas.length) {
      this.slides.slideTo(id, 500);
      this.posicion = id + 1;
      //this.saveQuestion(id);
    } else {
      this.endQuestion();
    }
  }

  changeQuestion(){
    let indexAnterior = this.slides.getPreviousIndex();
    this.saveQuestion(indexAnterior+1);
  }

  guardarOption(value, e,id) {
    if (e.checked) this.answerStudent[id-1] += value;
    else this.answerStudent[id-1] -= value;
    console.log(this.answerStudent);
  }

  obtenerPuntaje(session,attempt) {
    this.service.obtenerPuntaje(session,attempt).subscribe(data=>{
      console.log(data);
      var detalle = data["data"]["question_detail"];
      var rptaIncorrecta = 0;
      var rptaCorrecta = 0;
      for(var i=0;i<detalle.length;i++){
        rptaIncorrecta+=detalle[i]["wrong_answers"];
        rptaCorrecta+=detalle[i]["correct_answers"];
      }
      this.resultados = new Resultados(data["data"]["result"],rptaCorrecta,rptaIncorrecta,data["data"]["answer_blank"],data["data"]["answer_correct"]);
      if(this.resultados["result"]>=10){
        this.resultados["aprobo"] = "aprobado";
      }else{
        this.resultados["aprobo"] = "desaprobado";
      } 
      console.log(this.resultados);
      this.type = "resultado";
      /*var nota = document.getElementById("aprobo").innerHTML;
      if(nota.length>=2) document.getElementById("aprobo").style.color = "green";
      else document.getElementById("aprobo").style.color = "red";*/
    },err=>{
      console.log(err);
    });
    
    this.preguntas = [];
    this.answerStudent = [];
  }

  verSolucionario() {
    this.type = "verSolucionario";
  }

  irAlumnos() {
    this.type = "listAlumnos";
    this.type2 = "";
    this.menuCtrl.close();

  }

   irAdmin() {
    this.navCtrl.push(AdminPage); 
  }

  iraPerfil() {
    this.type = "miperfil";
    this.type2 = "";
    this.menuCtrl.close();
    this.service.getInstitution(this.data["data"]["session_id"]).subscribe((data) => {
      var datos = data["data"];
      for (var i = 0; i < datos.length; i++) {
        this.misInstituciones.push({
          value: datos[i]["id"],
          name: datos[i]["code"]
        });
      }
    });

    this.service.getGeoloc(this.data["data"]["session_id"]).subscribe((data) => {
      var datos = data["data"];
      for (var i = 0; i < datos.length; i++) {
        this.misLocaciones.push({
          value: datos[i]["id"],
          name: datos[i]["name"]
        });
      }
    });
  }

  actualizarPerfil() {
    console.log("actualizado!!") //falta terminar;
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 600
    });
    this.loader.present();
  }

  showRadio(id) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ir a la pregunta');
    for (var i = 0; i < this.preguntas.length; i++) {
      alert.addInput({
        type: 'radio',
        label: 'Pregunta ' + (i + 1),
        value: '' + (i + 1),
        checked: false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.slides.slideTo(data - 1, 500);
      }
    });
    alert.present();
  }

  onSlideChangeStart() {
    console.log("hola");
  }

  finExamen: Date = null;
  showConfirm(id) {
    let confirm = this.alertCtrl.create({
      title: '¿Estas seguro que deseas terminar el examen?',
      buttons: [
        {
          text: 'SI',
          handler: () => {
            console.log(id);
            //this.type="resultado";
            this.saveQuestion(id);
            this.finalizarExamen(this.data["data"]["session_id"], this.attempt);
            this.obtenerPuntaje(this.data["data"]["session_id"], this.attempt);
            this.finExamen = new Date();
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

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Examen Concluido',
      subTitle: '',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.obtenerPuntaje(this.data["data"]["session_id"], this.attempt);
          }
        },
      ]
    });
    alert.present();
  }
  endQuestion() {
    const alert = this.alertCtrl.create({
      title: 'Ya no hay mas preguntas',
      subTitle: '',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });
    alert.present();
  }

  intentoExamen() {
    const alert = this.alertCtrl.create({
      title: 'Usted ya tomo este examen',
      subTitle: '',
      buttons: [
        {
          text: 'Ok',
        },
      ]
    });
    alert.present();
  }
}


