import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
/**
 * Clase empleada para comunicarnos con la API REST y tiene metodos para gestionar la configuración de la página
 */

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
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
  ) {
    /**
     * Asignamos la ruta de nuestra API REST
     */
    this.url = 'http://localhost/rest/configuracion';
  }
  /**
   * Permite obtener un JSON con la configuración de la página
   */
  getConfiguracion() : Observable<any> {
    return this.http.get(this.url,{ responseType: 'json'});
  }

  /**
   * Permite editar la configuración de la página
   */
  editarConfiguracion(configuracion) : Observable<any>{
    let params = 'configuracion='+JSON.stringify(configuracion);
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin')+ ':' + sessionStorage.getItem('pass')))
      .append('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url,params,{headers,responseType: 'json'});
  }
}
