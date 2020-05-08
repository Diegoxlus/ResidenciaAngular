import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permanencia} from '../models/permanencia';

@Injectable({
  providedIn: 'root'
})
export class PermanenciaService {

  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = 'http://localhost/rest/permanencia';
  }

  addPermanencia(nuevaPermanencia: Permanencia): Observable<any>  {
    let json = JSON.stringify(nuevaPermanencia);
    let parametros = "permanencia="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  getMisPermanencias(): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  getPermanencias(): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/'+'hoy',{headers, responseType: 'json'});
  }

  eliminarAsistencia(id): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+id,{headers: headers,responseType:'json'});
  }

}
