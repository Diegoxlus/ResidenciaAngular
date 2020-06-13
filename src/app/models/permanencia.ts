/**
 * Modelo para instanciar Permanencias los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Permanencia {
  /**
   * Contiene el id de la permanencia.
   */
  private _id ?;
  /**
   * Contiene el email del residente al que pertenece la permanencia del fin de semana.
   */
  private _residente ?;
  /**
   * Contiene el dia en el que va a permanecer el residente en la residencia.
   */
  private _dia?;
  /**
   * Contiene el nombre del residente que va a permanecer en la residencia el fin de semana.
   */
  private _nombre?;
  /**
   * Contiene los apellidos del residente que va a permanecer en la residencia el fin de semana.
   */
  private _apellidos?;
  /**
   * Contiene el número de la habitación en la que está el residente.
   */
  private _habitacion?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Permanencia a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param id
   * @param residente
   * @param dia
   * @param nombre
   * @param apellidos
   * @param habitacion
   */
  constructor(id ?, residente ?, dia ?,nombre ?, apellidos ?, habitacion ?) {
    this._id = id;
    this._residente = residente;
    this._dia = dia;
    this._nombre = nombre;
    this._apellidos = apellidos;
    this._habitacion = habitacion
  }


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get residente() {
    return this._residente;
  }

  set residente(value) {
    this._residente = value;
  }

  get dia() {
    return this._dia;
  }

  set dia(value) {
    this._dia = value;
  }


  get nombre() {
    return this._nombre;
  }

  set nombre(value) {
    this._nombre = value;
  }

  get apellidos() {
    return this._apellidos;
  }

  set apellidos(value) {
    this._apellidos = value;
  }

  get habitacion() {
    return this._habitacion;
  }

  set habitacion(value) {
    this._habitacion = value;
  }
}
