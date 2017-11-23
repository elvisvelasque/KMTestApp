import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

export class User {
  name: string;
  username: string;

  constructor(name: string, username: string) {
    this.name = name;
    this.username = username;
  }
}

const url="https://kmtest.victoralin10.com/api/";
const url2 = "https://evaluapp.victoralin10.com/api/"

@Injectable()
export class ServiceProvider {

  api: string = 'http://localhost:8000/';
  api2: string = 'http://localhost:8000/login';

  //url: string = 'http://localhost:8000/alumnosWb';

  constructor(public http: Http) {
    // console.log('Hello ServiceProvider Provider');

  }

  currentUser: User;

  public login(credentials) {
    if (credentials.username == null || credentials.password === null) {
      return Observable.throw("por favor ingrese los campos ");
    }

    return Observable.create(observer => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let data = {
        username: credentials.username,
        password: credentials.password
      };

      this.http.post(url2+'student/auth/sign-in', JSON.stringify(data), {headers: headers})
        .subscribe(dat => {
          let response = dat.json();
          if (response.success) {
            window.localStorage.setItem("credentials", JSON.stringify(response));
          }
          observer.next(response);
          observer.complete();
        });
    });
  }

  public register(newUser){
    if (newUser.username == null || newUser.password === null || newUser.first_name === null || newUser.last_name === null || newUser.email === null) {
      return Observable.throw("por favor ingrese los campos ");
    }

    return Observable.create(observer => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let data = {
        username: newUser.username,
        password: newUser.password,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email
      };

      this.http.post(url2+'student/auth/sign-up', JSON.stringify(data), {headers: headers})
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
        });
    });
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  crearloginHeader(headers: Headers) {
    headers.append('Autorization', window.localStorage.getItem('token'));
  }

  private() {
    let headers = new Headers();
    this.crearloginHeader(headers);
    return this.http.get(this.api2, {
      // return this.http.get(this.api2+'private',{
      headers: headers
    }).map(res => res.json());
  }

  /*login(data) {
    return this.http.post(this.api2, data).map(this.extractData);
  }*/

  isLogged() {
    return window.localStorage.getItem('token');
  }

  logout() {
    window.localStorage.removeItem('token');
    return true;
  }

  getData() {
    return this.http.get(this.api + 'alumno/1').map(res => res.json());

  }

  //codigo   facilito
  LoadData2() {
    this.http.get(this.api + 'alumnos').map(res => res.json()).subscribe(data => {
      console.log(data);
    });
  }

  /*LoadData() {
    var url = this.api + 'alumnos';
    var response = this.http.get(url).map(res => res.json());
    return response;
}*/

  getLocalData() {
    return this.http.get('assets/data/serviceData.json').map(res => res.json());

  }

  getDataExamenPendiente() {
    return this.http.get(this.api + 'alumnosWb').do(this.logResponse).map(res => res.json());


  }

  getDataExamenPendienteLocal() {
    return this.http.get('assets/data/serviceData.json').map(res => res.json());

  }

  getDataExamenLocal(session) {
    return Observable.create(observer => {
      let headers = new Headers();
      headers.append('s-session',session);
      this.http.get(url2+'student/evaluation', {headers: headers})
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
        });
    });
  }

  getPreguntas(session,id) {
    return Observable.create(observer => {
      let headers = new Headers();
      headers.append('s-session',session);
      this.http.get(url2+'student/evaluation/'+id+'/questions', {headers: headers})
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
        });
    });
  }

  saveQuestion(token,id_exam,id_question,answer){
    return Observable.create(observer=>{
      let headers = new Headers();
      headers.append('x-access-token',token);
      var data = {
        id_attempt:id_exam,
        id_question:id_question,
        answer:answer
      }
      this.http.post(url+'attempt/'+id_exam+'/answer/'+id_question,JSON.stringify(data),{headers:headers})
        .subscribe(dat=>{
          observer.next(dat.json());
          observer.complete();
        })
    });
  }

  attempt(token,id_test){
    return Observable.create(observer=>{
      let headers = new Headers();
      headers.append('x-access-token',token);
      var data={
        id_test:id_test
      }
      this.http.post(url+'attempt/new',JSON.stringify(data),{headers:headers})
        .subscribe(dat=>{
          observer.next(dat.json());
          observer.complete();
        })
    });
  }

  getInstitution(session){
    return Observable.create(observer=>{
      let headers = new Headers();
      headers.append('s-session',session);
      this.http.get(url2+'student/institution',{headers:headers})
        .subscribe(dat=>{
          observer.next(dat.json());
          observer.complete();
        })
    });
  }

  getGeoloc(session){
    return Observable.create(observer=>{
      let headers = new Headers();
      headers.append('s-session',session);
      this.http.get(url2+'student/geoloc',{headers:headers})
        .subscribe(dat=>{
          observer.next(dat.json());
          observer.complete();
        })
    });
  }

  /*getMensajes() {
    return this.http.get(this.url)
      .do(this.logResponse)
      .map(this.extractData2)
      .catch(this.catchError)
}*/

  // InsertMember(firstname,lastename,email,mobile,city,state,country,postalcode)
  // {
  //     var url = this.api+firstname+'&lastname='+lastename+'&email='+email+'&mobile='+mobile+'&city='+city+'&state='+state+'&country='+country+'&postalcode='+postalcode;
  //   var response = this.http.get(url).map(res => res.json());
  //   return response;
  // }

  // DeleteMember(id)
  // {
  //   var url = this.api+id;
  //   var response = this.http.get(url).map(res => res.json());
  //   return response;

  // }

  // EditMember(id,firstname,lastename,email,mobile,city,state,country,postalcode)
  // {
  //   var url = this.api+firstname+'&lastname='+lastename+'&email='+email+'&mobile='+mobile+'&city='+city+'&state='+state+'&country='+country+'&postalcode='+postalcode+'&id='+id;
  //   var response = this.http.get(url).map(res => res.json());
  //   return response;
  // }

  // searchMembers(name) {
  //   var url = this.api+name ;
  //   var response = this.http.get(url).map(res => res.json());
  //   return response;
  // }

  private extractData(res: Response) {
    let body = res.json();
    if (body.succes === true) {
      window.localStorage.setItem('token', body.token);
    }
    return body || {};
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server Error.");
  }

  private logResponse(res: Response) {
    console.log(res);
  }

  private extractData2(res: Response) {
    return res.json();
  }
}
