import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {InicioexamenPage} from './inicioexamen';

@NgModule({
  declarations: [
    InicioexamenPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioexamenPage),
  ],
  exports: [
    InicioexamenPage
  ]
})
export class InicioexamenPageModule {
}
