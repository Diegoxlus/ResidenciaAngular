/**
 * Modelo para instanciar Pagos los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Pago {
  /**
   * Contiene el id del pago.
   */
  private _id ?;
  /**
   * Contiene el email del residente que realiza el pago.
   */
  private _residente?;
  /**
   * Contiene el dia en el que se realiza el pago.
   */
  private _dia?;
  /**
   * Contiene la extensión del pago es decir:
   * PDF: el valor será pdf
   * JPG: el valor será jpg
   */
  private _extension?;
  /**
   * Contiene el valor del mes al que corresponde el pago.
   */
  private _mes?;
  /**
   * Contiene el valor del estado del pago:
   * 0 : En espera de que séa revisado. El residente subió el pago pero aún no fué revisado.
   * 1 : Aceptado. La secretaria acepto el pago del residente.
   * 2 : Rechazado. La secretaria rechazó el pago dle residente.
   */
  private _correcto?;
  /**
   * Contiene el nombre del residente que realiza el pago.
   */
  private _nombre?;
  /**
   * Contiene los apellidos del residente que realiza el pago.
   */
  private _apellidos?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Pago a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param id
   * @param residente
   * @param dia
   * @param extension
   * @param mes
   * @param correcto
   * @param nombre
   * @param apellidos
   */
  constructor(id, residente, dia, extension, mes, correcto,nombre,apellidos) {
    this._id = id;
    this._residente = residente;
    this._dia = dia;
    this._extension = extension;
    this._mes = mes;
    this._correcto = correcto;
    this._nombre = nombre;
    this._apellidos = apellidos;
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

  get extension() {
    return this._extension;
  }

  set extension(value) {
    this._extension = value;
  }

  get mes() {
    return this._mes;
  }

  set mes(value) {
    this._mes = value;
  }

  get correcto() {
    return this._correcto;
  }

  set correcto(value) {
    this._correcto = value;
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
}
