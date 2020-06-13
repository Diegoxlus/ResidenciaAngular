/**
 * Modelo para instanciar objetos Habitacion los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Habitacion {
  /**
   * Contiene el numero de la habitacion.
   */
  private _numero ?;

  /**
   * Contiene el tipo de habitación:
   * 0 Individual
   * 1 Doble
   */
  private _tipo ?;
  /**
   * Contiene el email del primer residente, es decir:
   * El residente que se aloja en la habitación.
   */
  private _residente1 ?;
  /**
   * Contiene el email del segundo residente, es decir:
   * El segundo residente que se aloja en la habitación en el caso de que esta sea de tipo doble.
   * Si es individual, y obtenemos una lista de habitaciones este valor para las de tipo
   * individual permanecerá a NULL
   */
  private _residente2 ?;

  /**
   * Contiene el valor de si está disponible
   */
  private _disponible ?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Habitacion a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param numero
   * @param tipo
   * @param residente1
   * @param residente2
   * @param disponible
   */
  constructor(numero ?, tipo ?, residente1 ?, residente2 ?, disponible ?) {

    this._numero = numero;


    this._tipo = tipo;


    this._residente1 = residente1;


    this._residente2 = residente2;


    this._disponible = disponible;
  }


  get numero() {
    return this._numero;
  }

  set numero(value) {
    this._numero = value;
  }

  get tipo() {
    return this._tipo;
  }

  set tipo(value) {
    this._tipo = value;
  }

  get residente1() {
    return this._residente1;
  }

  set residente1(value) {
    this._residente1 = value;
  }

  get residente2() {
    return this._residente2;
  }

  set residente2(value) {
    this._residente2 = value;
  }

  get disponible() {
    return this._disponible;
  }

  set disponible(value) {
    this._disponible = value;
  }
}
