import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from 'protractor';
import {Usuario} from '../models/usuario';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = 'http://localhost/rest/usuario';
  }

  login(email, pass): Observable<HttpResponse<Config>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + pass));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<Config>(this.url +"/"+email, {headers, observe: 'response'});
  }

  registrar(usuario: Usuario): Observable<any> {
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }
  /*
  getResidentes(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/trabajador",{headers, responseType: 'json'});
  }
  */


  getResidentesHabitacion(): Observable<any> {
     let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
     return this.http.get(this.url+"/residente/habitacion",{headers, responseType: 'json'});
  }

  getTrabajadores(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+"/trabajador",{headers, responseType: 'json'});
  }

  registroManual(usuario: Usuario){
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url+"/manual", parametros, {headers: headers,responseType:'json'});
  }

  eliminarTrabajador(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+"/trabajador/"+email,{headers,responseType:'text'});
  }


  eliminarResidente(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+"/residente/"+email,{headers,responseType:'text'});
  }

  modificarResidente(residente: Usuario) {
    let json = JSON.stringify(residente);
    let parametros = "residente="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+"/residente/"+residente.email, parametros, {headers: headers,responseType:'json'});
  }

  modificarTrabajador(trabajador: Usuario) {
    let json = JSON.stringify(trabajador);
    let parametros = "trabajador="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+"/trabajador/"+trabajador.email, parametros, {headers: headers,responseType:'json'});
  }
}
