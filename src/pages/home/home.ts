import { Component, ViewChild } from '@angular/core';
import {LoadingController, NavController, IonicPage,NavParams,AlertController} from 'ionic-angular';

import {InicioexamenPage} from '../inicioexamen/inicioexamen';
import {LoginPage} from '../login/login';
import {ServiceProvider} from '../../providers/service/service';
import {TimerComponent} from '../timer/timer'

export  class TestPendiente {
  id: number;
  name: string;
  subject:string;
  start_datetime:string;
  end_datetime:string;
  number_questions:number;
  correct_points:number;
  error_points:number;
  attempts_allowed:number; 

  constructor(id: number, name: string, subject: string, start_datetime: string, end_datetime: string, number_questions: number, correct_points: number, error_points: number,attempts_allowed: number) {
    this.id = id;
    this.name = name;
    this.subject = subject;
    this.start_datetime = start_datetime;
    this.end_datetime = end_datetime;
    this.number_questions = number_questions;
    this.correct_points = correct_points;
    this.error_points = error_points;
    this.attempts_allowed = attempts_allowed;
  }
}

export class rptaAlumno{
  id_question:number;
  answer_student:number;
  constructor(id_question:number,answer_student:number){
    this.id_question=id_question;
    this.answer_student=answer_student;
  }
}

export class Pregunta {
  id_question:number;
  id_test:number;
  order:number;
  question:string;
  picture:string;
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  option5:string;
  answer:number;
  correct_points:number;
  error_points:number;

  constructor(id_question: number, id_test: number, order: number, question: string, picture: string, option1: string, option2: string, option3: string,option4: string,option5: string,answer: number,correct_points: number,error_points: number) {
    this.id_question = id_question;
    this.id_test = id_test;
    this.order = order;
    this.question = question;
    this.picture = picture;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.option5 = option5;
    this.option5 = option5;
    this.answer = answer;
    this.correct_points = correct_points;
    this.error_points = error_points;
  }
}

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage{
  // @ViewChild('mySlider') slider: Slides;
  // slides:any;

  @ViewChild(TimerComponent) timer:TimerComponent;

  users: any[];
  loader: any;
  type: string;
  type2: string;
  type3: string;
  data: string;
  examen : TestPendiente[]=[];
  idPregunta:number=1;
  preguntas : Pregunta[]=[];
  answerStudent:number=0;
  respuestasAlumno:rptaAlumno[]=[];

  nombreExamen:string="";
  number_questions:number=0;
  correct_points:number=0;
  error_points:number=0;
  start_datetime:string="";
  end_datetime:string="";
  id:number=0;

  id_question:number=0;
  question:string="";
  picture:string="";
  option1:string="";
  option2:string="";
  option3:string="";
  option4:string="";
  option5:string="";

  
  numRspndidas:number=0;
  numBlancos:number=0;
  puntajeFinal:number=0;

  duracionExamen:number=0;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              public service: ServiceProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
   
    this.type = "pendiente";
    this.type2 = "inicio";
    this.data = this.navParams.get('data');//datos token pasados a la vista home
    this.examenPendiente();//muestra los examenes pendientes
  }

  /*ngAfterViewInit(){
  }*/

//data local
  EnDataLocal() {
    this.service.getLocalData().subscribe(
      data => {
        this.users = data;
        console.log(data);
        this.loader.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('datos competos')
    );
  }

//extrayendo la data de examenes
  examenPendiente() {
    this.examen = [];
    //this.presentLoading();
    this.service.getDataExamenLocal(this.data["token"]).subscribe(
      data => {
        let tests = data["data"];
        //console.log(tests[0]["id_test"]);
        for(var i=0;i<tests.length;i++){
          this.examen.push(new TestPendiente(tests[i]["id_test"],tests[i]["name"],tests[i]["subject"],tests[i]["start_datetime"],tests[i]["end_datetime"],tests[i]["number_questions"],tests[i]["correct_points"],tests[i]["error_points"],tests[i]["attempts_allowed"])); 
        }
      },
      err => {
        console.log(err);
      }
    );
  }

//informacion del examen
  ViewIExamen(exam) {
    //this.navCtrl.push(InicioexamenPage);
    this.type2="examenPendiente";
    this.type="";
    this.nombreExamen = exam.name;
    this.number_questions = exam.number_questions;
    this.correct_points = exam.correct_points;
    this.error_points = exam.error_points;
    this.start_datetime = exam.start_datetime;
    this.end_datetime = exam.end_datetime;
    this.id=exam.id;
  }

  Duracion(start,end){
    let inicio = new Date(start);
    let fin = new Date(end);
    let secini = inicio.getUTCHours()*3600+inicio.getUTCMinutes()*60+inicio.getUTCSeconds();
    let secfin = fin.getUTCHours()*3600+fin.getUTCMinutes()*60+fin.getUTCSeconds();
    let result = secfin-secini;
    return this.getTime(result);
  }
  
  DuracionActual(end){
    let inicio = new Date();
    let fin = new Date(end);
    let inicioSec = inicio.getHours()*3600+inicio.getMinutes()*60+inicio.getSeconds();
    let finSec = fin.getUTCHours()*3600+fin.getUTCMinutes()*60+fin.getUTCSeconds();
    return inicioSec-finSec;
  }

  getTime(inputSeconds:number){
    var sec_num = parseInt(inputSeconds.toString(),10);
    var hours = Math.floor(sec_num/3600);
    var minutes = Math.floor((sec_num-(hours*3600))/60);
    var seconds = sec_num-(hours*3600)-(minutes*60);
    return this.addo(hours)+":"+this.addo(minutes)+":"+this.addo(seconds);
  }

  cambio(horadia){
    let format = new Date(horadia);
    return this.addo(format.getUTCHours())+":"+this.addo(format.getUTCMinutes())+":"+this.addo(format.getUTCSeconds());
  }
  getFecha(horadia){
    let format = new Date(horadia);
    return this.addo(format.getUTCFullYear())+"-"+this.addo(format.getUTCMonth())+"-"+this.addo(format.getUTCDay());
  }
  addo(comp){
    return (((comp+"").length==1)?"0"+comp:comp);
  }

  back(){
    this.type2="inicio";
    this.type="pendiente";
    this.nombreExamen = "";
    this.number_questions = 0;
    this.correct_points = 0;
    this.error_points = 0;
    this.start_datetime = "";
    this.end_datetime = "";
    this.id=0;
  }


  back2(){
    this.type2="inicio";
    this.type="pendiente";
    this.type3="";
    this.number_questions=0;
    this.numRspndidas = 0;
    this.numBlancos = 0;
    this.puntajeFinal = 0;
    this.id=0;

  }

 finalizo(){
    setTimeout(()=>{
      if(this.type3!="cabeceraExamen") return;
      else if(!this.timer.hasFinished())this.finalizo();
      else this.presentAlert();
    },1000)
  }

  DarExamen(id){
    this.presentLoading();
    this.type2="";
    this.type="";
    this.type3="cabeceraExamen";
    this.preguntas=[];
    this.duracionExamen = 100;//this.DuracionActual(this.end_datetime);
    setTimeout((result) => {//inicia el contador del examen
      this.timer.startTimer();
      this.finalizo();//saber si acabo el tiempo
    }, 1000);

    this.service.getPreguntas(this.data["token"],id).subscribe(
      data => {
        let tests = data["data"];
        for(var i=0;i<tests.length;i++){
          this.preguntas.push(new Pregunta(tests[i]["id_question"],tests[i]["id_test"],tests[i]["order"],tests[i]["question"],tests[i]["picture"],tests[i]["option1"],tests[i]["option2"],tests[i]["option3"],tests[i]["option4"],tests[i]["option5"],tests[i]["answer"],tests[i]["correct_points"],tests[i]["error_points"]));
        }
        this.id_question=this.preguntas[0]["id_question"];
        this.question=this.preguntas[0]["question"];
        this.picture=this.preguntas[0]["picture"];
        this.option1=this.preguntas[0]["option1"];
        this.option2=this.preguntas[0]["option2"];
        this.option3=this.preguntas[0]["option3"];
        this.option4=this.preguntas[0]["option4"];
        this.option5=this.preguntas[0]["option5"];
      },
      err => {
        console.log(err);
      }
    );
  }

  iraPregunta(idPregunta){
    if(idPregunta>-1 && idPregunta<5){
      this.presentLoading();
      this.id_question=this.preguntas[idPregunta]["id_question"];
      this.question=this.preguntas[idPregunta]["question"];
      this.picture=this.preguntas[idPregunta]["picture"];
      this.option1=this.preguntas[idPregunta]["option1"];
      this.option2=this.preguntas[idPregunta]["option2"];
      this.option3=this.preguntas[idPregunta]["option3"];
      this.option4=this.preguntas[idPregunta]["option4"];
      this.option5=this.preguntas[idPregunta]["option5"];
      this.answerStudent=(this.respuestasAlumno[idPregunta]==null)?0:this.respuestasAlumno[idPregunta]["answer_student"]
    }
  }

  guardarOption(value,e){
    if(e.checked) this.answerStudent+=value;
    else this.answerStudent-=value;
  }

  guardarRpta(idPregunta){
    let primero=true;
    for(var i=0;i<this.respuestasAlumno.length;i++){
      if(this.respuestasAlumno[i]["id_question"]==idPregunta+1){
        this.respuestasAlumno[i]["answer_student"] = this.answerStudent*1;
        primero=false;
      }
    }
    if(primero){
      this.respuestasAlumno.push(new rptaAlumno(idPregunta+1,this.answerStudent*1));
    }
    console.log(this.respuestasAlumno);
  }

  obtenerPuntaje(){
    this.type3="resultado";
    for(var i=0;i<this.respuestasAlumno.length;i++){
      if(this.respuestasAlumno[i]["answer_student"]==0){
        this.numBlancos++;
      }else{
        this.numRspndidas++;
      }
    }
    
    for(var i=0;i<this.preguntas.length;i++){
      for(var j=0;j<this.respuestasAlumno.length;j++){
        if(this.preguntas[i]["id_question"]==this.respuestasAlumno[j]["id_question"]){
          if(this.preguntas[i]["answer"]==this.respuestasAlumno[j]["answer_student"]){
            this.puntajeFinal+=this.correct_points;
          }else this.puntajeFinal-=this.error_points;
        }
      }
    }
    this.respuestasAlumno = [];
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

  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Ir a la pregunta');
    for(var i=0;i<this.preguntas.length;i++){
      alert.addInput({
        type: 'radio',
        label: 'Pregunta '+(i+1),
        value: ''+(i),
        checked: false
      });
    }
  
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.guardarRpta(this.id_question-1);
        this.iraPregunta((data*1));
      }
    });
    alert.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Estas seguro que deseas terminar el examen?',
      buttons: [
        {
          text: 'SI',
          handler: () => {
            this.obtenerPuntaje();
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
            this.obtenerPuntaje();
          }
        },
      ]
    });
    alert.present();
  }
}


