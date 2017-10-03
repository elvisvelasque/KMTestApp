import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExamenPage} from './examen';
import {TimerComponent} from '../../assets/js/timer';

@NgModule({
  declarations: [
    ExamenPage, TimerComponent
  ],
  imports: [
    IonicPageModule.forChild(ExamenPage),
  ],
  exports: [
    ExamenPage
  ]
})
export class ExamenPageModule {
}
