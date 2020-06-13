/**
 * Modelo para instanciar Partes los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Parte {
  /**
   * Contiene el id del parte.
   */
  private _id ?;
  /**
   * Contiene el email del residente al que pertenece el pago.
   */
  private _residente ?;
  /**
   * Contiene un entero con el valor entero:
   * 0 Leve
   * 1 Grave
   * 2 Muy Grave
   */
  private _gravedad ?;
  /**
   * Contiene el motivo por el que se creó el parte.
   */
  private _motivo ? ;
  /**
   * Contiene el nombre del residente al que pertenece el parte.
   */
  private _nombreResidente ?;
  /**
   * Contiene los apellidos del residente al que pertenece el parte.
   */
  private _apellidosResidente ?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Parte a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param id
   * @param residente
   * @param gravedad
   * @param motivo
   * @param nombreResidente
   * @param apellidosResidente
   */
  constructor(id ?, residente ?, gravedad ?, motivo ?,nombreResidente ?, apellidosResidente ?) {
    this._id = id;
    this._residente = residente;
    this._gravedad = gravedad;
    this._motivo = motivo;
    this._nombreResidente = nombreResidente;
    this._apellidosResidente = apellidosResidente;
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

  get gravedad() {
    return this._gravedad;
  }

  set gravedad(value) {
    this._gravedad = value;
  }

  get motivo() {
    return this._motivo;
  }

  set motivo(value) {
    this._motivo = value;
  }

  get nombreResidente() {
    return this._nombreResidente;
  }

  set nombreResidente(value) {
    this._nombreResidente = value;
  }

  get apellidosResidente() {
    return this._apellidosResidente;
  }

  set apellidosResidente(value) {
    this._apellidosResidente = value;
  }
}
