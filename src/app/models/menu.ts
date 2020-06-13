/**
 * Modelo para instanciar objetos de Menu los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Menu {
  /**
   * Contiene el día al que pertenece el menu yyyy-mm-dd
   */
  private _dia ?;

  /**
   * Contiene la comida correspondiente a ese día.
   */
  private _comida ?;

  /**
   * Contiene la cena que corresponde a ese día.
   */
  private _cena ?;

  /**
   * Contiene un entero:
   * 0 en el caso de que no se modifique el menú.
   * 1 en el caso de que se modifique.
   */
  private _modificado ?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Menu  a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param dia
   * @param comida
   * @param cena
   * @param modificado
   */
  constructor(dia ?, comida ?, cena ?, modificado ?) {
    this._dia = dia;
    this._comida = comida;
    this._cena = cena;
    this._modificado = modificado;
  }

  get dia() {
    return this._dia;
  }

  set dia(value) {
    this._dia = value;
  }

  get comida() {
    return this._comida;
  }

  set comida(value) {
    this._comida = value;
  }

  get cena() {
    return this._cena;
  }

  set cena(value) {
    this._cena = value;
  }

  get modificado() {
    return this._modificado;
  }

  set modificado(value) {
    this._modificado = value;
  }
}
