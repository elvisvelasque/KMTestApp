import { Component, ViewChild,AfterViewInit } from '@angular/core';
import {LoadingController, NavController, IonicPage,NavParams,AlertController,MenuController} from 'ionic-angular';

import {InicioexamenPage} from '../inicioexamen/inicioexamen';
import {LoginPage} from '../login/login';
import {ServiceProvider} from '../../providers/service/service';
import {TimerComponent} from '../timer/timer'
import {TestPendiente} from '../../model/TestPendiente';
import {Pregunta} from '../../model/Pregunta';

export class rptaAlumno{//despues seras eliminado
  id_question:number;
  answer_student:number;
  constructor(id_question:number,answer_student:number){
    this.id_question=id_question;
    this.answer_student=answer_student;
  }
}

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage{
  @ViewChild(TimerComponent) timer:TimerComponent;

  users: any[];
  loader: any;
  type: string;
  type2: string;
  data: string;
  examen : TestPendiente[]=[];
  idPregunta:number=1;
  preguntas : Pregunta[]=[];
  answerStudent:number=0;
  respuestasAlumno:rptaAlumno[]=[];//despues seras eliminado
  estilosIniciales: object[]=[];


  nombreExamen:string="";
  number_questions:number=0;
  correct_points:number=0;
  error_points:number=0;
  start_datetime:string="";
  end_datetime:string="";
  id:number=0;
  
  numRspndidas:number=0;
  numBlancos:number=0;
  puntajeFinal:number=0;

  duracionExamen:number=0;

  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              public service: ServiceProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public menuCtrl:MenuController) {
   
    this.type = "pendiente";
    this.type2 = "inicio";
    this.data = this.navParams.get('data');//datos token pasados a la vista home
    this.examenPendiente();//muestra los examenes pendientes
  }

//extrayendo la data de examenes
  examenPendiente() {
    this.examen = [];
    this.service.getDataExamenLocal(this.data["token"]).subscribe(
      data => {
        let tests = data["data"];
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

    //this.service.attempt(this.data["token"],exam.id).subscribe( //para saber si ya tomo o no el examen
      //data=>{
        //if(data["success"]==false){
          //this.intentoExamen()
        //}else{
          //this.navCtrl.push(InicioexamenPage);
          this.type="examenPendiente";
          this.type2="";
          this.nombreExamen = exam.name;
          this.number_questions = exam.number_questions;
          this.correct_points = exam.correct_points;
          this.error_points = exam.error_points;
          this.start_datetime = exam.start_datetime;
          this.end_datetime = exam.end_datetime;
          this.id=exam.id;
          this.preguntas=[];
          this.service.getPreguntas(this.data["token"],exam.id).subscribe(
            data => {
              let tests = data["data"];
              for(var i=0;i<tests.length;i++){
                this.preguntas.push(new Pregunta(tests[i]["id_question"],tests[i]["id_test"],tests[i]["order"],tests[i]["question"],tests[i]["picture"],tests[i]["option1"],tests[i]["option2"],tests[i]["option3"],tests[i]["option4"],tests[i]["option5"],tests[i]["answer"],tests[i]["correct_points"],tests[i]["error_points"]));
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
      //}
    //);
  }

  saveQuestion(id){
   console.log(this.data["token"]+"--"+this.id+"--"+this.preguntas[id-1]["id_question"]+"--"+this.answerStudent);
   this.service.saveQuestion(this.data["token"],this.id,this.preguntas[id-1]["id_question"],this.answerStudent).subscribe(
    data=>{
      console.log(data);
    },
    err=>{
      console.log(err);
    }
   );
   this.answerStudent=0;
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
    let inicio = new Date();//el inicio debe tener la hora del dispositivo o del servidor?????
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

  DuracionAlumnoExamen(){//cuanto le tomo al alumno dar el examen;
    let secini  = this.inicioExamen.getUTCHours()*3600+this.inicioExamen.getUTCMinutes()*60+this.inicioExamen.getUTCSeconds();
    let secfin = this.finExamen.getUTCHours()*3600+this.finExamen.getUTCMinutes()*60+this.finExamen.getUTCSeconds();
    let result = secfin-secini;
    return this.getTime(result);
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
    this.number_questions=0;
    this.numRspndidas = 0;
    this.numBlancos = 0;
    this.puntajeFinal = 0;
    this.id=0;

  }

 finalizo(){
    setTimeout(()=>{
      if(this.type!="cabeceraExamen") return;
      else if(!this.timer.hasFinished())this.finalizo();
      else{
        this.presentAlert();
        this.finExamen = new Date();
      } 
    },1000)
  }

  inicioExamen:Date=null;
  DarExamen(id){
    this.presentLoading();
    this.type="cabeceraExamen";
    this.duracionExamen = 100;//this.DuracionActual(this.end_datetime);
    this.inicioExamen = new Date();
    setTimeout((result) => {//inicia el contador del examen
      this.timer.startTimer();
      this.finalizo();//saber si acabo el tiempo
    }, 1000);
    setTimeout(()=>{
      document.getElementById("pregunta_1").style.display = "block";
    },0);
    setTimeout(()=>{
      document.getElementsByClassName("botonTerminar")[this.preguntas.length-1].removeAttribute("style");
      document.getElementsByClassName("botonTerminar")[this.preguntas.length-1].setAttribute("style","display:block");
    },0)
  }

  posicion:number=1;
  goBack(id){
    if(id>1){
      document.getElementById("pregunta_"+(id)).style.display="none";
      document.getElementById("pregunta_"+(id-1)).style.display="block";
      this.posicion = id-1;
      this.saveQuestion(id);
    }
  }

  goForward(id){
    if(id<this.preguntas.length){
      document.getElementById("pregunta_"+(id)).style.display="none";
      document.getElementById("pregunta_"+(id+1)).style.display="block";
      this.posicion = id+1;
      this.saveQuestion(id);
    }else{
      this.endQuestion();
    }
  }

  guardarOption(value,e){
    if(e.checked) this.answerStudent+=value;
    else this.answerStudent-=value;
    console.log(this.answerStudent);
  }

  obtenerPuntaje(){
    this.type="resultado";
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

  verSolucionario(){
    this.type="verSolucionario";
  }

  iraPerfil(){
    this.type="miperfil";
    this.type2="";
    this.menuCtrl.close();
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
    for(var i=0;i<this.preguntas.length;i++){
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
        this.saveQuestion(id);
      }
    });
    alert.present();
  }

  finExamen:Date=null;
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
            this.obtenerPuntaje();
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
            this.saveQuestion(this.posicion);
            this.obtenerPuntaje();
          }
        },
      ]
    });
    alert.present();
  }
  endQuestion(){
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

  intentoExamen(){
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


