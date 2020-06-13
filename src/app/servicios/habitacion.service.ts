import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Habitacion} from '../models/habitacion';
/**
 * Clase empleada para comunicarnos con la API REST, contiene mmétodos para la gestion de habitaciones
 */

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

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
    this.url = 'http://localhost/rest/habitacion';
  }

  /**
   * Permite obtener todas las habitaciones de la residencia.
   */
  getHabitaciones(): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  /**
   * Permite eliminar una habitacion de la residencia, la que se le pasa como parametro.
   */
  eliminarHabitacion(numero: any): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+"/"+numero,{headers,responseType:'json'});
  }

  /**
   * Permite registrar una habitación, recibe como parametro el objeto habitación que es convertido a JSON
   * posteriormente para enviarlo a la API REST como parametro.
   */
  registrarHabitacion(nuevaHabitacion: Habitacion) : Observable<any> {
    let json = JSON.stringify(nuevaHabitacion);
    let parametros = "habitacion="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  /**
   * Elimina a un residente de una habitación, en concreto el residente que se le pasa por parametro y que
   * pertenece a la habitación que se le pasa por parametro.
   */
  eliminarResidenteHabitacion(numero: any, residente: any) : Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+"/"+numero+'/'+residente,{headers,responseType:'json'});

  }
  /**
   * Permite editar una habitación, se envia la habitación completa como JSON ya que posteriormente en la
   * parte REST esta va a substituirla gracias al id que es único.
   */
  editarHabitacion(habitacion: Habitacion) {
    let json = JSON.stringify(habitacion);
    let parametros = "habitacion="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));;
    return this.http.post(this.url+'/'+habitacion.numero, parametros, {headers: headers,responseType:'json'});
  }
}
