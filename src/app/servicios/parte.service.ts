import { Injectable } from '@angular/core';
import {Parte} from '../models/parte';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParteService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = 'http://localhost/rest/parte'
  }


  registrarParte(parte: Parte) : Observable<any> {
    let json = JSON.stringify(parte);
    let parametros = "parte="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  getPartes() : Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  editarParte(parte: Parte) {
    let json = JSON.stringify(parte);
    let parametros = "parte="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  eliminarParte(id) : Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}
