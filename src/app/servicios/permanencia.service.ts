import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permanencia} from '../models/permanencia';

/**
 * Clase empleada para comunicarnos con la API REST, contiene metodos para gestionar la permanencia de los residentes
 * los fines de semana.
 */

@Injectable({
  providedIn: 'root'
})
export class PermanenciaService {

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
     * Establecemos la url de la API REST
     */
    this.url = 'http://localhost/rest/permanencia';
  }

  /**
   * Permite añadir una nueva perminanecia.
   */
  addPermanencia(nuevaPermanencia: Permanencia): Observable<any>  {
    let json = JSON.stringify(nuevaPermanencia);
    let parametros = "permanencia="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  /**
   * Permite consultar las permanencias para un residente.
   * Devuelve un JSON con todas las permanencias del residente logueado.
   */
  consultarPermanencias(): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  /**
   * Permite obtener las permanencias de los residentes para el dia actual.
   */
  getPermanencias(): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/'+'hoy',{headers, responseType: 'json'});
  }
  /**
   * Elimina la permanencia de un residente para un dia del fin de semana.
   */
  eliminarPermanencia(id): Observable<any>{
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+id,{headers: headers,responseType:'json'});
  }

}
