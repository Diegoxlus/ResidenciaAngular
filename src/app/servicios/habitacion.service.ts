import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Habitacion} from '../models/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = 'http://localhost/rest/habitacion';
  }

  getHabitaciones(): Observable<any> {
    console.log(sessionStorage.getItem('emailLogin'));
    console.log(sessionStorage.getItem('pass'));
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  eliminarHabitacion(numero: any): Observable<any> {
      return this.http.delete(this.url+"/"+numero,{responseType:'json'});
  }

  registrarHabitacion(nuevaHabitacion: Habitacion) : Observable<any> {
    let json = JSON.stringify(nuevaHabitacion);
    let parametros = "habitacion="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  eliminarResidenteHabitacion(numero: any, residente: any) : Observable<any> {
    return this.http.delete(this.url+"/"+numero+'/'+residente,{responseType:'json'});

  }


  editarHabitacion(habitacion: Habitacion) {
    let json = JSON.stringify(habitacion);
    let parametros = "habitacion="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url+'/'+habitacion.numero, parametros, {headers: headers,responseType:'json'});
  }
}
