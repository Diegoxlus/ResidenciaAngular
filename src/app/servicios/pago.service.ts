import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pago} from '../models/pago';

/**
 * Clase que permite comunicarnos con la API REST, contiene métodos para la gestión de los pagos.
 */

@Injectable({
  providedIn: 'root'
})
export class PagoService {

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
     * Asignamos a la variable la url de la API REST
     */
    this.url = 'http://localhost/rest/pago'
  }

  /**
   * Permite añadir un pago, recibe como parametros el mes indexado es decir 0 sería Enero, 1 Febrero...
   * el archivo (PDF,JPG,DOC...), estos datos se envian a la API REST junto con el residente al que pertenece.
   */
  public addPago(indexMes, file: File): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    let formData: FormData = new FormData();
      formData.append('mes',indexMes);
      formData.append('archivo',file);
      formData.append('residente',window.sessionStorage.getItem('emailLogin'));
      return this.http.post(this.url,formData,{headers});
  }

  /**
   * Permite obtener los pagos realizados por el residente, es empleado para que el residente pueda
   * obtener sus propios pagos.
   */
  getPagoResidente() : Observable<any> {
    let residente = window.sessionStorage.getItem('emailLogin');
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/'+residente,{headers, responseType: 'json'});
  }

  /**
   * Permite descargar un pago, gracias a su identificador.
   */
  descargarPago(pago:Pago): Observable<any>{
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'/identificador/'+pago.id,{headers,responseType: 'blob'});


  }

  /**
   * Permite obtener los pagos de un mes, la opcion es un valor numerico ej: 0 pagos no procesados, 1 pagos correctos, 2 pagos rechaados.
   */
  getPagos(mes: string, opcion: number): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.get(this.url+'s/'+mes+'/'+opcion,{headers,responseType: 'json'});

  }
  /**
   * Permite eliminar un pago dle sistema, se eliminará el pago de la BD y el archivo.
   */
  eliminarPago(pago: Pago) {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.delete(this.url+'/'+pago.id,{headers,responseType: 'json'});
  }

  /**
   * Permite indicar que un pago es correcto.
   */
  verificarPago(pago: Pago) {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.put(this.url+'/verifica/'+pago.id,null,{headers,responseType: 'json'});
  }

  /**
   * Permite indicar que un pago no es correcto.
   */
  rechazarPago(pago: Pago) {
    let headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa(sessionStorage.getItem('emailLogin') + ':' + sessionStorage.getItem('pass')));
    return this.http.put(this.url+'/rechazo/'+pago.id,null,{headers,responseType: 'json'});
  }
}
