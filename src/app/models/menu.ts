export class Menu {
  private _dia ?;
  private _comida ?;
  private _cena ?;
  private _modificado ?;

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
