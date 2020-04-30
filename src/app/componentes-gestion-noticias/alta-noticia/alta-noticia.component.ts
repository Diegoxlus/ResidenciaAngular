import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NoticiaService} from '../../servicios/noticia.service';
import {Noticia} from '../../models/noticia';

@Component({
  selector: 'app-alta-noticia',
  templateUrl: './alta-noticia.component.html',
  styleUrls: ['./alta-noticia.component.css']
})
export class AltaNoticiaComponent implements OnInit {


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

  constructor(private router: Router,private noticiaService : NoticiaService){
    this.noticia = new Noticia();
  }


  altaNoticia() {
    this.pasarValoresNoticia();
    if (this.noticia.titulo == undefined || this.noticia.descripcion == undefined) {
      this.registroIncorrecto = true;
    } else {
      this.resetearIntento();
      this.noticiaService.registrarNoticia(this.noticia).subscribe(data => {
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
      this.noticia.titulo = this.titulo.value;
      this.noticia.descripcion = this.descripcion.value;
    }



  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  ngOnInit(): void {

  }

}
