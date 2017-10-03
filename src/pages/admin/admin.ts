import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {ServiceProvider} from '../../providers/service/service';

@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})

export class AdminPage {
  // @ViewChild('mySlider') slider: Slides;
  // slides:any;
  users: any[];
  examen: any[];
  prueba: any[];
  loader: any;
  type: string;

  constructor(public navCtrl: NavController,
              public service: ServiceProvider,
              public loadingCtrl: LoadingController) {

    this.type = "examen";
    //  this.slides = [
    //     {
    //       id: "examen",
    //       title: "First Slide"
    //     },
    //     {
    //       id: "alumno",
    //       title: "Second Slide"
    //     }
    //   ];
    //  this.service.LoadData2();

    // this.type="alumno";
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
  ngOnInit() {
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
  }


//data local
  EnDataLocal() {
    this.presentLoading();
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

  examenPendiente() {
    this.presentLoading();
    this.service.getDataExamenLocal().subscribe(
      data => {
        this.prueba = data;
        console.log(data);
        this.loader.dismiss();
      },
      err => {
        console.log(err);
      },
      () => console.log('datos competos')
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

//   Viewperson(member)
//   {
//       this.navCtrl.push(PersonPage,{member:member});
//   }
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


  getMensajes() {
    this.service.getMensajes().subscribe(data => console.log(data));
  }

}
