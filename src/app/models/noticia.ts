/**
 * Modelo para instanciar Noticias los atributos comienzan por _ por convenio, ya que son privados.
 */
export class Noticia {
  /**
   * Contiene el id de la noticia.
   */
  private _id ?;
  /**
   * Contiene el titulo de la noticia.
   */
  private _titulo ?;
  /**
   * Contiene la descripcion de la noticia.
   */
  private _descripcion ?;
  /**
   * Contiene el día de la noticia, en caso de que se envie el objeto para una petición a la API REST
   * el día no es necesario, ya que este se añade en la API REST. En el caso de que se recuperen noticias
   * si que va a tener el valor de su fecha de publicación.
   */
  private _dia ?;

  /**
   * Todos los parametros son opcionales, asi podemos generar una instancia de la clase Noticia a nuestro gusto,
   * en el caso de que no nos interese algun atributo, basta con no instanciarlo cuando creamos el objeto.
   * @param id
   * @param titulo
   * @param descripcion
   * @param dia
   */
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
