import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
 *Clase empleada para comunicarse con la API rest, tiene metodos para la asistencia a comidas y cenas
 */
@Injectable({
  providedIn: 'root'
})



export class AsistenciaService {

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
     *Asignamos a url la ruta de la API rest
     */
    this.url = 'http://localhost/rest/asistencia';


  }
  /**
   * Permite obtener la asistencia del residente logueado a comidas y cenas, ve sus asistencias.
   */
  getAsistenciaUsuario(): Observable<any>{

    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }
  /**
   * Obtiene un JSON con los residentes que asisten a la comida un dia determinado
   */
  getAsistenciaComida(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/comida/'+dia,{headers, responseType: 'json'});
  }

  /**
   * Obtiene un JSON con los residentes que asisten a la cena un dia determinado.
   */
  getAsistenciaCena(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/cena/'+dia,{headers, responseType: 'json'});
  }

  /**
   * Permite a un residente inscribirse a la comida un dia determinado.
   */
  inscribirseComida(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin')+ ':' + sessionStorage.getItem('pass')))
    return this.http.put(this.url+'/'+'comer'+'/'+dia,null,{headers, responseType: 'json'});
  }
  /**
   * Permite a un residente inscribirse a la cena un dia determinado.
   */
  inscribirseCena(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.put(this.url+'/'+'cenar'+'/'+dia,null,{headers, responseType: 'json'});
  }
  /**
   *Permite a un residente desapuntarse de una comida un dia determinado.
   */
  desinscribirseComida(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.put(this.url+'/'+'desinscribirse-comer'+'/'+dia,null,{headers, responseType: 'json'});
  }
  /**
   * Permite a un residente desapuntarse de una cena un dia determinado.
   */
  desinscribirseCena(dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.put(this.url+'/'+'desinscribirse-cenar'+'/'+dia,null,{headers, responseType: 'json'});
  }

  /**
   * Permite a un residente indicar que si asiste a un comida de un dia concreto.
   */
  asisteComida(residente,dia): Observable<any>{

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass'))
      })
    };


    return this.http.post(this.url+'/'+'si-come'+'/'+residente+'/'+dia,null,httpOptions);

  }
  /**
   * Permite indicar a un residente que no asiste a la comida de un dia concreto.
   */
  noAsisteComida(residente,dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'no-come'+'/'+residente+'/'+dia,null,{headers, responseType: 'json'});

  }
  /**
   * Permite indicar a un residente que asiste a la cena un dia concreto.
   */
  asisteCena(residente,dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'si-cena'+'/'+residente+'/'+dia,null,{headers, responseType: 'json'});

  }
  /**
   * Permite indicar a un residente que no asiste a una cena un dia concreto
   */
  noAsisteCena(residente,dia): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'no-cena'+'/'+residente+'/'+dia,null,{headers, responseType: 'json'});

  }
  /**
   * Permite obtener la asistencia a comodias y cenas de todos los residentes anotados un dia concreto.
   * Ej: Se quieren obtener los residentes anotados en un dia concreto a una comida a una cena o ambas,
   * con la finalidad de obtener una vista mas detallada.
   */
  getAsistencia(sfecha: any) : Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/dia/'+sfecha,{headers, responseType: 'json'});
  }
}
