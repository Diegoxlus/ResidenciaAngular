export class Habitacion {
  private _numero ?;
  private _tipo ?;
  private _residente1 ?;
  private _residente2 ?;
  private _disponible ?;


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
