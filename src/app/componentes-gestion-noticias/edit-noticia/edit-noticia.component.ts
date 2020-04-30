import { Component, OnInit } from '@angular/core';
import {Noticia} from '../../models/noticia';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NoticiaService} from '../../servicios/noticia.service';
import {DatosNoticiaService} from '../../servicios/datos-noticia.service';

@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css']
})
export class EditNoticiaComponent implements OnInit {

  noticia: Noticia;
  registroCorrecto : boolean = false;
  registroIncorrecto : boolean = false;
  msgError: string;

  public FormularioAlta = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
    ]),
    descripcion: new FormControl('', [
      Validators.required ]),

  });

  constructor(private router: Router,private noticiaService : NoticiaService, private datosNoticiaService: DatosNoticiaService){
    this.noticia = new Noticia();
  }


  editarNoticia() {
    this.pasarValoresNoticia();
    if (this.noticia.titulo == undefined || this.noticia.descripcion == undefined) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.noticiaService.editarNoticia(this.noticia).subscribe(data => {
          this.registroCorrecto = true;
          this.FormularioAlta.reset();

        }, error => {
          this.registroIncorrecto = true;
          this.msgError = error.error;

        }
      );
    }
  }

  onSubmit() {
    console.log(this.noticia);
  }

  get titulo(){
    return this.FormularioAlta.get('titulo');
  }
  get descripcion(){
    return this.FormularioAlta.get('descripcion');
  }

  private pasarValoresNoticia() {

    if(!this.titulo.value||  !this.descripcion.value){
      this.msgError = "Rellena todos los campos del formulario";
    }
    else{
      this.noticia.id = this.datosNoticiaService.noticia.id;
      this.noticia.titulo = this.titulo.value;
      this.noticia.descripcion = this.descripcion.value;
    }



  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  ngOnInit(): void {
    this.titulo.setValue(this.datosNoticiaService.noticia.titulo);
    this.descripcion.setValue(this.datosNoticiaService.noticia.descripcion);

  }

}
