import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pago} from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  public url: string;

  constructor(public http: HttpClient) {
    this.url = 'http://localhost/rest/pago'
  }

  public addPago(indexMes, file: File): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    let formData: FormData = new FormData();
      formData.append('mes',indexMes);
      formData.append('archivo',file);
      formData.append('residente',window.sessionStorage.getItem('emailLogin'));
      return this.http.post(this.url,formData,{headers});
  }


  getPagoResidente() : Observable<any> {
    let residente = window.sessionStorage.getItem('emailLogin');
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/'+residente,{headers, responseType: 'json'});
  }

  descargarPago(pago:Pago): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/identificador/'+pago.id,{headers,responseType: 'blob'});


  }

  getPagos(mes: string, opcion: number): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'s/'+mes+'/'+opcion,{headers,responseType: 'json'});

  }

  eliminarPago(pago: Pago) {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+pago.id,{headers,responseType: 'json'});
  }

  verificarPago(pago: Pago) {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/verifica/'+pago.id,{headers,responseType: 'json'});
  }

  rechazarPago(pago: Pago) {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/rechazo/'+pago.id,{headers,responseType: 'json'});
  }
}
