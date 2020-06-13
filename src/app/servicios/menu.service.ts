import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu';

/**
 * Clase que permite comunicarnos con la API REST, contiene métodos para la gestión del menu .
 */

@Injectable({
  providedIn: 'root'
})
export class MenuService {
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
    this.url = 'http://localhost/rest/menu'
  }

  /**
   * Obtiene todos los menus desde la fecha actual.
   */
  getMenus() : Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  /**
   * Obtiene el menu para un dia concreto.
   */
  getMenuDia(dia:String): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));

    return this.http.get(this.url+'/'+dia,{headers, responseType: 'json'});
  }

  /**
   * Permite añadir un nuevo menu, el objeto nuevoMenu ya contiene el dia al que está asociada la comida
   * y la cena.
   */
  añadirMenu(nuevoMenu: Menu): Observable<any> {
    let json = JSON.stringify(nuevoMenu);
    let parametros = "menu="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers,responseType:'json'});
  }
}
