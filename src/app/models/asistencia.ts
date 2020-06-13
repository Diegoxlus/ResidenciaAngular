/**
 * Modelo para instanciar Asistencias los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Asistencia {
  /**
   * Guarda el email del residente
   */
  private _residente ?;

  /**
   * Dia en el que el residente realiza la asistencia
   */
  private _dia ?;

  /**
   * Guarda el valor 0 en caso de que no coma, guarda el valor 1 en caso de que si coma
   */
  private _come ?;

  /**
   * Guarda el valor 0 en caso de que no cene, guarda el valor 1 en caso de que si cene
   */
  private _cena ?;

  /**
   * Guarda el valor 0 en caso de que no asista a la comida, guarda el valor 1 en caso de que si asista a la comida
   */
  private _asiste_comida ?;

  /**
   * Guarda el valor 0 en caso de que no asista a la cena, guarda el valor 1 en caso de que si asista a la cena
   */
  private _asiste_cena ?;

  /**
   * Guarda la comida que hay en el menú.
   */
  private _menu_comida ?;

  /**
   * Guarda la cena que hay en el menú.
   */
  private _menu_cena?;

  /**
   * Guarda el nombre del usuario que asiste a la comida o a la cena. Util en caso de querer obtener
   * este parametro de la API REST.
   */
  private _nombre?;

  /**
   * Guarda los apellidos del usuario que asiste a la comida o a la cena. Util en caso de querer obtener
   * este parametro de la API REST.
   */
  private _apellidos?;


  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Asistencia a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param residente
   * @param dia
   * @param come
   * @param cena
   * @param asiste_comida
   * @param asiste_cena
   * @param menu_comida
   * @param menu_cena
   * @param nombre
   * @param apellidos
   */
  constructor(residente ?, dia ?, come ?, cena ?, asiste_comida ?, asiste_cena ?, menu_comida ?, menu_cena ?, nombre?, apellidos?) {
    this._residente = residente;
    this._dia = dia;
    this._come = come;
    this._cena = cena;
    this._asiste_comida = asiste_comida;
    this._asiste_cena = asiste_cena;
    this._menu_comida = menu_comida; //Empleado para los JOINS de asistencia_menu
    this._menu_cena = menu_cena;  // Empleado para los JOINS de asistencia_menu
    this._nombre = nombre;
    this._apellidos = apellidos;
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

  get come() {
    return this._come;
  }

  set come(value) {
    this._come = value;
  }

  get cena() {
    return this._cena;
  }

  set cena(value) {
    this._cena = value;
  }

  get asiste_comida() {
    return this._asiste_comida;
  }

  set asiste_comida(value) {
    this._asiste_comida = value;
  }

  get asiste_cena() {
    return this._asiste_cena;
  }

  set asiste_cena(value) {
    this._asiste_cena = value;
  }

  get menu_comida() {
    return this._menu_comida;
  }

  set menu_comida(value) {
    this._menu_comida = value;
  }

  get menu_cena() {
    return this._menu_cena;
  }

  set menu_cena(value) {
    this._menu_cena = value;
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
