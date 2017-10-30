import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExamenPage} from './examen';

@NgModule({
  declarations: [
    ExamenPage
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
