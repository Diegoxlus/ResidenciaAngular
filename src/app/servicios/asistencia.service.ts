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

  getAsistenciaComida(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/comida/'+dia,{headers, responseType: 'json'});
  }

  getAsistenciaCena(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/cena/'+dia,{headers, responseType: 'json'});
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
    return this.http.get(this.url+'/'+'desinscribirse-cenar'+'/'+dia,{headers, responseType: 'json'});
  }

  asisteComida(residente,dia): Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass'))
      })
    };

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    headers = headers.append("Content-Type", "application/json");
    return this.http.post(this.url+'/'+'si-come'+'/'+residente+'/'+dia,null,httpOptions);

  }
  noAsisteComida(residente,dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'no-come'+'/'+residente+'/'+dia,null,{headers, responseType: 'json'});

  }
  asisteCena(residente,dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'si-cena'+'/'+residente+'/'+dia,null,{headers, responseType: 'json'});

  }
  noAsisteCena(residente,dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'no-cena'+'/'+residente+'/'+dia,null,{headers, responseType: 'json'});

  }

  getAsistencia(sfecha: any) : Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/dia/'+sfecha,{headers, responseType: 'json'});
  }
}
