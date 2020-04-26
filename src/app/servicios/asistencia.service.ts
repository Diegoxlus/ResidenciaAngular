import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  public url: string;

  constructor(
    public http: HttpClient
  ) {
    this.url = 'http://localhost/rest/asistencia';
  }

  getAsistenciaUsuario(): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  inscribirseComida(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin')+ ':' + sessionStorage.getItem('pass')))
    return this.http.get(this.url+'/'+'comer'+'/'+dia,{headers, responseType: 'json'});
  }
  inscribirseCena(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/'+'cenar'+'/'+dia,{headers, responseType: 'json'});
  }
  desinscribirseComida(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/'+'desinscribirse-comer'+'/'+dia,{headers, responseType: 'json'});
  }
  desinscribirseCena(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'+'+'desinscribirse-cenar'+'/'+dia,{headers, responseType: 'json'});
  }
}
