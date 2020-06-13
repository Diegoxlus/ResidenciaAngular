import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from 'protractor';
import {Usuario} from '../models/usuario';

/**
 * Clase empleada para comunicarnos con la API REST, contiene metodos para la gestión de usuarios.
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
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
     * Asignación de la ruta de la API REST
     */
    this.url = 'http://localhost/rest/usuario';
  }

  /**
   * Permite realizar el login de un usuario.
   */
  login(email, pass): Observable<HttpResponse<Config>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(email + ':' + pass));
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<Config>(this.url +"/"+email, {headers, observe: 'response'});
  }

  /**
   * Permite registrar un usuario en el sistema.
   */
  registrar(usuario: Usuario): Observable<any> {
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }
  /*
  getResidentes(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.get(this.url+"/trabajador",{headers, responseType: 'json'});
  }
  */

  /**
   * Permite obtener un array JSON con los residentes y el número de la habitación en el que están
   */
  getResidentesHabitacion(): Observable<any> {
     let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
     return this.http.get(this.url+"/residente/habitacion",{headers, responseType: 'json'});
  }
  /**
   * Permite obtener un array JSON con los trabajadores de la residencia, es decir todos los usuarios con el rol 0,1,2,4. El 3 es el de los residentes.
   */
  getTrabajadores(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+"/trabajador",{headers, responseType: 'json'});
  }
  /**
   * Permite que un usuario se registre en el sistema, para poder realizar esté metodo tiene que estar habilitado
   * el registro manual, la secretaria o la directora pueden hacerlo en el apartado de configuración.
   */
  registroManual(usuario: Usuario){
    let json = JSON.stringify(usuario);
    let parametros = "usuario="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+"/manual", parametros, {headers: headers,responseType:'json'});
  }

  /**
   * Permite eliminar un trabajador de la residencia. Se envia el email ya que es la clave primaria.
   */
  eliminarTrabajador(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+"/trabajador/"+email,{headers,responseType:'text'});
  }

  /**
   * Permite eliminar un residente de la residencia. Se envia el email ya que es la clave primaria.
   */
  eliminarResidente(email: string): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+"/residente/"+email,{headers,responseType:'text'});
  }
  /**
   * Permite modificar un residente del sistema. Se envia el residente a la parte REST como JSON, gracias al id
   * se modifica el Residente con el resto de parametros.
   */
  modificarResidente(residente: Usuario) {
    let json = JSON.stringify(residente);
    let parametros = "residente="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+"/residente/"+residente.email, parametros, {headers: headers,responseType:'json'});
  }
  /**
   * Permite modificar un trabajador del sistema. Se envia el trabajador a la parte REST como JSON, gracias al id
   * se modifica el Residente con el resto de parametros.
   */
  modificarTrabajador(trabajador: Usuario) {
    let json = JSON.stringify(trabajador);
    let parametros = "trabajador="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+"/trabajador/"+trabajador.email, parametros, {headers: headers,responseType:'json'});
  }
}
