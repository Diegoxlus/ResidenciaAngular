import { Injectable } from '@angular/core';
import {Noticia} from '../models/noticia';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Parte} from '../models/parte';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  public url: string;
  constructor(public http: HttpClient) {
    this.url = 'http://localhost/rest/noticia'
  }

  public registrarNoticia(noticia: Noticia) : Observable<any> {
    console.log(noticia);
    let json = JSON.stringify(noticia);
    let parametros = "noticia="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  public getNoticias() : Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  public editarNoticia(noticia: Noticia) {
    let json = JSON.stringify(noticia);
    let parametros = "noticia="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  eliminarNoticia(id) : Observable<any> {
    console.log("si");
    console.log(id);
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }

}
