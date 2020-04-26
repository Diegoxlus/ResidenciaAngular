import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = 'http://localhost/rest/configuracion';
  }

  getConfiguracion() : Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  editarConfiguracion(configuracion) : Observable<any>{
    let params = 'configuracion='+JSON.stringify(configuracion);
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin')+ ':' + sessionStorage.getItem('pass')))
      .append('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url,params,{headers,responseType: 'json'});
  }
}
