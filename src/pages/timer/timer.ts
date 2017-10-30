import {Component, Input} from '@angular/core';
import {ITimer} from './itimer';
import { AlertController, NavController } from 'ionic-angular';
import {HomePage} from '../home/home';

@Component({
    selector: 'timer',
    templateUrl: 'timer.html',
    //styleUrls:['pages/timer/timer.css']
})
export class TimerComponent{

    @Input() timeInSeconds:number;
    public timer: ITimer;
    constructor(public navCtrl: NavController,public alertCtrl: AlertController){}

    ngOnInit(){
        this.initTimer();
    }

    hasFinished(){
        return this.timer.hasFinished;
    }

    initTimer(){
        if(!this.timeInSeconds){this.timeInSeconds=0;}

        this.timer = <ITimer>{
            second: this.timeInSeconds,
            runTimer: false,
            hasStarted: false,
            hasFinished: false,
            secondsRemaining: this.timeInSeconds
        };

        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }

    startTimer(){
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick(); 
    }

    pauseTimer(){
        this.timer.runTimer = false;
    }

    resumeTimer(){
        this.startTimer();
    }

    timerTick(){
        setTimeout(()=>{
            if(!this.timer.runTimer){return;}
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if(this.timer.secondsRemaining>0) this.timerTick();
            else {
                this.timer.hasFinished = true;
                this.presentAlert();
            }
        },1000);
    }

    getSecondsAsDigitalClock(inputSeconds:number){
        var sec_num = parseInt(inputSeconds.toString(),10);
        var hours = Math.floor(sec_num/3600);
        var minutes = Math.floor((sec_num-(hours*3600))/60);
        var seconds = sec_num-(hours*3600)-(minutes*60);
        return this.formato(hours)+":"+this.formato(minutes)+":"+this.formato(seconds);
    }

    formato(param:number){
        return (param<10)?"0"+param:param.toString();
    }

    presentAlert() {
        let alert = this.alertCtrl.create({
          title: 'Examen concluido',
          subTitle: '',
          buttons: [
            {
                text: 'Ok',
                handler: () => {
                    this.navCtrl.setRoot('HomePage');
                }
            },
          ]
        });
        alert.present();
      }
    
}