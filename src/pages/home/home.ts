import {Component} from '@angular/core';
import {LoadingController, NavController, IonicPage,NavParams} from 'ionic-angular';

import {InicioexamenPage} from '../inicioexamen/inicioexamen';
import {LoginPage} from '../login/login';
import {ServiceProvider} from '../../providers/service/service';

export  class TestPendiente {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

@IonicPage() 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  // @ViewChild('mySlider') slider: Slides;
  // slides:any;
  users: any[];
  loader: any;
  type: string;
  data: string;
  examen : TestPendiente[]=[];

  
  constructor(public navCtrl: NavController, 
              private navParams: NavParams,
              public service: ServiceProvider,
              public loadingCtrl: LoadingController) {
   
    this.type = "pendiente";
    this.data = this.navParams.get('data');//datos token pasados a la vista home
    this.examenPendiente();//muestra los examenes pendientes
    //  this.slides = [
    //     {
    //       id: "pendiente",
    //       title: "First Slide"
    //     },
    //     {
    //       id: "pasado",
    //       title: "Second Slide"
    //     }
    //   ];
    //  this.service.LoadData2();

    // this.type="pasado";
  }

  // onSegmentChanged(segmentButton) {
  //   console.log("Segment changed to", segmentButton.value);
  //   const selectedIndex = this.slides.findIndex((slide) => {
  //     return slide.id === segmentButton.value;
  //   });
  //   this.slider.slideTo(selectedIndex);
  // }

  // onSlideChanged(slider) {
  //   console.log('Slide changed');
  //   const currentSlide = this.slides[slider.activeIndex];
  //   this.type = currentSlide.id;
  // }
  /*ngOnInit() {
    this.presentLoading();
    this.service.LoadData().subscribe(
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
    //this.presentLoading();
    this.service.getDataExamenLocal(this.data["token"]).subscribe(
      data => {
        /*this.examen = data;
        console.log(data);
        this.loader.dismiss();*/
        let tests = data["data"];
        console.log(tests[0]["id_test"]);
        for(var i=0;i<tests.length;i++){
          this.examen.push(new TestPendiente(tests[i]["id_test"],tests[i]["name"])); 
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // getData(){
  //   this.service.getData().subscribe(
  //     data=>this.users=data,
  //     err=>console.log(err)

  //   )
  // }

//  rootPage: any = HomePage;

//   constructor() { }

//   category: any;

//   setCategory(category) {
//     switch (category) {
//       case 'nature':
//         this.rootPage = NaturePage;
//         break;
//       case 'food':
//         this.rootPage = FoodPage;
//         break;
//       case 'people':
//         this.rootPage = PeoplePage;
//         break;
//     }
//   }

//  Refresh()
//   {
//       this.presentLoading();
//       this.data.LoadMembers().subscribe(
//           data => {
//               this.members = data;
//               console.log(data);
//               this.loader.dismiss();
//           },
//           err => {
//               console.log(err);
//           },
//           () => console.log('Movie Search Complete')
//       );
//   }
//pasar a la hoja de inicio del examen
  ViewIExamen() {
    this.navCtrl.push(InicioexamenPage);
  }

//     View(member)
//     {
//         this.navCtrl.push(PersonPage,{member:member});
//     }
//   Insert()
//   {
//       this.navCtrl.push(InsertPage);
//   }

//   update(member)
//   {
//       this.navCtrl.push(UpdatePage,{member:member});
//   }

//   Delete(id:any)
//   {
//       this.presentLoading();
//       this.data.DeleteMember(id).subscribe(
//           data => {
//               this.members = data;
//               console.log(data);
//               this.loader.dismiss();
//           },
//           err => {
//               console.log(err);
//           },
//           () => console.log('Movie Search Complete')
//       );
//   }
//   search(event, key)
//   {
//       if(event.target.value.length > 0) {
//           this.data.searchMembers(event.target.value).subscribe(
//               data => {
//                   this.members = data;
//                   console.log(data);
//               },
//               err => {
//                   console.log(err);
//               },
//               () => console.log('Movie Search Complete')
//           );
//       }
//   }

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


  /*getMensajes() {
    this.service.getMensajes().subscribe(data => console.log(data));
}*/

}
