import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public url: string;
  constructor(public http: HttpClient) {
    this.url = 'http://localhost/rest/menu'
  }

  getMenus() : Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  getMenuDia(dia:String): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+'/'+dia,{headers, responseType: 'json'});
  }

  añadirMenu(nuevoMenu: Menu): Observable<any> {
    let json = JSON.stringify(nuevoMenu);
    let parametros = "menu="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }
}
