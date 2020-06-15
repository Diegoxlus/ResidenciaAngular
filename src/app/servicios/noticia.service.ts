import { Injectable } from '@angular/core';
import {Noticia} from '../models/noticia';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

/**
 * Clase que permite comunicarnos con la API REST, contiene métodos para la gestión de noticias.
 */
@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

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
     * Asociamos la url de la API REST a la variable
     */
    this.url = 'http://localhost/rest/noticia'
  }

  /**
   * Permite registrar una nueva noticia, el objeto noticia contiene el dia al que está asociada.
   */
  public registrarNoticia(noticia: Noticia) : Observable<any> {

    let json = JSON.stringify(noticia);
    let parametros = "noticia="+json;
    let headers = new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url, parametros, {headers: headers,responseType:'json'});
  }

  /**
   * Permite obtener todas las noticias registradas en el sistema.
   */
  public getNoticias() : Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url,{headers, responseType: 'json'});
  }

  /**
   * Permite editar una noticia, ya que el objeto notica contiene el id, permite substitur los valores posteriormente
   * en la API rest.
   */
  public editarNoticia(noticia: Noticia) {
    let json = JSON.stringify(noticia);
    let parametros = "noticia="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.post(this.url+'/'+'editar', parametros, {headers: headers,responseType:'json'});

  }
  /**
   * Permite eliminar una noticia, recibe como parametro el ID de la noticia
   */
  eliminarNoticia(id) : Observable<any> {
    (id);
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+'eliminar'+'/'+id,{headers:headers,responseType:'json'});
  }

}
