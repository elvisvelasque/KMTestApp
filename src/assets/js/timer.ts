import {Component} from '@angular/core';

import {AlertController} from 'ionic-angular'; //import { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'timer',
  template: `
    <div class="center">
      <p class="center"> {{ minutes }}:{{ seconds | number: '2.0' }} </p>
      <!--<p>
        <button (click)="togglePause()"
          class="btn btn-danger">
          {{ buttonLabel }}
        </button>
      </p>-->
    </div>
  `
})

export class TimerComponent {
  minutes: number;
  seconds: number;
  isPaused: boolean;
  buttonLabel: string;

  constructor(public alertCtrl: AlertController) {
    this.resetTimer();
    setInterval(() => this.tick(), 1000);
  }

  resetTimer(): void {
    this.isPaused = false;
    this.minutes = 1;
    this.seconds = 30;
    this.buttonLabel = 'Start';
  }

  togglePause(): void {
    this.isPaused = !this.isPaused;
    if (this.minutes < 24 || this.seconds < 59) {
      this.buttonLabel = this.isPaused ? 'Resume' : 'Pause';
    }
  }

  private tick(): void {
    if (!this.isPaused) {
      this.buttonLabel = 'Pause';

      if (--this.seconds < 0) {
        this.seconds = 59;
        if (--this.minutes < 0) {
          this.resetTimer();
        }
      }
    }
  }

  private showAlertFin() {
    if (this.minutes == 0 && this.seconds == 0) {
      this.isPaused = !this.isPaused;
      let alert = this.alertCtrl.create({
        title: 'Terminó el examen !',
        subTitle: 'Sus respuestas se guardarán',
        buttons: [{
          text: 'OK'/* ,
          handler: () => {
          document.getElementById("timer").innerHTML="30";
          }*/
        }],
      });
      alert.present();
    }
  }
}

//bootstrap(TimerComponent);
