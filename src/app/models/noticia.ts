export class Noticia {
  private _id ?;
  private _titulo ?;
  private _descripcion ?;
  private _dia ?;


  constructor(id ?, titulo ?, descripcion ?, dia ?) {
    this._id = id;
    this._titulo = titulo;
    this._descripcion = descripcion;
    this._dia = dia;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get titulo() {
    return this._titulo;
  }

  set titulo(value) {
    this._titulo = value;
  }

  get descripcion() {
    return this._descripcion;
  }

  set descripcion(value) {
    this._descripcion = value;
  }

  get dia() {
    return this._dia;
  }

  set dia(value) {
    this._dia = value;
  }


}
