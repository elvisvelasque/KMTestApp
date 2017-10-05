import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FinexamenPage} from './finexamen';

@NgModule({
  declarations: [
    FinexamenPage,
  ],
  imports: [
    IonicPageModule.forChild(FinexamenPage),
  ],
  exports: [
    FinexamenPage
  ]
})
export class FinexamenPageModule {
}
