export class Configuracion {
  private _id ?;
  private _hora_comida ?;
  private _hora_cena ?;
  private _limite_hora_comida ?;
  private _limite_hora_cena ?;


  constructor(id ?, hora_comida ?, hora_cena ?, limite_hora_comida ?, limite_hora_cena ?) {
    this._id = id;
    this._hora_comida = hora_comida;
    this._hora_cena = hora_cena;
    this._limite_hora_comida = limite_hora_comida;
    this._limite_hora_cena = limite_hora_cena;
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
}
