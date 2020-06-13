/**
 * Modelo para instanciar objetos de Configuración los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Configuracion {
  /**
   * Contiene el id de la configuración.
   */
  private _id ?;

  /**
   * Contiene la hora a la que comen los residentes.
   */
  private _hora_comida ?;
  /**
   * Contiene la hora a la que cenan los residentes.
   */
  private _hora_cena ?;

  /**
   * Contiene las horas limite a la que se pueden inscribir los residentes, es decir:
   * Si tiene el valor 1, los residentes pueden inscribirse a la comida siemprey cuando no quede
   * una hora para esta.
   */
  private _limite_hora_comida ?;

  /**
   * Lo mismo que la hora limite de la comida pero para la cena.
   */
  private _limite_hora_cena ?;

  /**
   * Contiene el valor del registro manual, es decir:
   * 0 en caso de que el registro no esté habilitado
   * 1 en caso de que el registro esé habilitado
   */
  private _registro ?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Configuracion a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param id
   * @param hora_comida
   * @param hora_cena
   * @param limite_hora_comida
   * @param limite_hora_cena
   * @param registro
   */
  constructor(id ?, hora_comida ?, hora_cena ?, limite_hora_comida ?, limite_hora_cena ?,registro ?) {

    this._id = id;
    this._hora_comida = hora_comida;
    this._hora_cena = hora_cena;
    this._limite_hora_comida = limite_hora_comida;
    this._limite_hora_cena = limite_hora_cena;
    this._registro = registro;
  }


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get hora_comida() {
    return this._hora_comida;
  }

  set hora_comida(value) {
    this._hora_comida = value;
  }

  get hora_cena() {
    return this._hora_cena;
  }

  set hora_cena(value) {
    this._hora_cena = value;
  }

  get limite_hora_comida() {
    return this._limite_hora_comida;
  }

  set limite_hora_comida(value) {
    this._limite_hora_comida = value;
  }

  get limite_hora_cena() {
    return this._limite_hora_cena;
  }

  set limite_hora_cena(value) {
    this._limite_hora_cena = value;
  }


  get registro() {
    return this._registro;
  }

  set registro(value) {
    this._registro = value;
  }
}
