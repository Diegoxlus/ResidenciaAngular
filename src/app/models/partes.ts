export class Partes {
  private _residente ?;
  private _dia ?;
  private _come ?;
  private _cena ?;
  private _asiste_comida ?;
  private _asiste_cena ?;
  private _menu_comida ?;
  private _menu_cena?;

  constructor(residente ?, dia ?, come ?, cena ?, asiste_comida ?, asiste_cena ?, menu_comida ?, menu_cena ?) {
    this._residente = residente;
    this._dia = dia;
    this._come = come;
    this._cena = cena;
    this._asiste_comida = asiste_comida;
    this._asiste_cena = asiste_cena;
    this._menu_comida = menu_comida; //Empleado para los JOINS de asistencia_menu
    this._menu_cena = menu_cena;  // Empleado para los JOINS de asistencia_menu
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
}
