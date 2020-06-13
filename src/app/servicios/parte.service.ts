import { Injectable } from '@angular/core';
import {Parte} from '../models/parte';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 * Clase empleada para comunicarnos con la API rest, contiene metodos para la gestión de partes.
 */

@Injectable({
  providedIn: 'root'
})
export class ParteService {
  /**
   * URL donde guardamos la ruta de la api rest
   */
  public url: string;

  /**
   * En el constructor definimos la variable http, gracias a HttpClient podemos realizar la conexion
   * con la api REST
   */
  constructor(
    /**
     * variable usada para las peticiones
     */
    public http: HttpClient
  )
  {
    /**
     * Asigna la ruta de la API REST
     */
    this.url = 'http://localhost/rest/parte'
  }

  /**
   * Permite regustrar un nuevo parte en el sistema.
   */
  registrarParte(parte: Parte) : Observable<any> {
    let json = JSON.stringify(parte);
    let parametros = "parte="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  /**
   * Permite obtener todos los partes del sistema.
   */
  getPartes() : Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }
  /**
   * Permite editar un parte del sistema, ya que el parte contiene el id.
   */
  editarParte(parte: Parte) {
    let json = JSON.stringify(parte);
    let parametros = "parte="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }

  /**
   * Permite eliminar un parte del sistema gracias al parametro id
   */
  eliminarParte(id) : Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }
}
