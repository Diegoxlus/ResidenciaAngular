import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {MenuService} from '../../servicios/menu.service';
import {Menu} from '../../models/menu';
import {Router} from '@angular/router';


@Component({
  selector: 'app-alta-menu',
  templateUrl: './alta-menu.component.html',
  styleUrls: ['./alta-menu.component.css']
})
export class AltaMenuComponent implements OnInit {
  existeComida: boolean;
  comidaSelecionada: String;
  cenaSelecionada: String;
  nuevoMenu: Menu;
  registroCorrecto: boolean = false;
  registroIncorrecto: boolean = false;
  msgError:String;

  public FormularioAltaMenu = new FormGroup({
    comida: new FormControl('', [
      Validators.pattern("^[a-zA-Z0-9 ñÑ\\-_]*$"
      )]),
    cena: new FormControl('', [
      Validators.pattern("^[a-zA-Z0-9 ñÑ\\-_]*$")]),
    fecha: new FormControl('', [
      Validators.required,
    ])
  });

  private sfecha:string;

  constructor(private menuService: MenuService, public datepipe: DatePipe,private router: Router) {
    this.existeComida = false;
    this.nuevoMenu = new Menu();

  }

  ngOnInit() {


  }

  get comida(){
    return this.FormularioAltaMenu.get('comida');
  }

  get cena(){
    return this.FormularioAltaMenu.get('cena');
  }

  get fecha(){
    return this.FormularioAltaMenu.get('fecha');
  }

  filtro = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };








  onSubmit() {

  }

  comprobarComidas() {
    let fechaSelecionada = new Date(this.fecha.value);
    this.sfecha = this.datepipe.transform(fechaSelecionada,'yyyy-MM-dd').toString();

    this.menuService.getMenuDia(this.sfecha).subscribe(
      menu=>{
        this.existeComida = menu != false;
        this.comidaSelecionada = menu.comida;
        this.cenaSelecionada = menu.cena;
        this.resetearIntento();

      },error => {
        this.msgError= error;
        console.log(error);
      }
    )
  }

  altaMenu() {
    this.nuevoMenu.comida = this.comida.value;
    this.nuevoMenu.cena = this.cena.value;
    this.nuevoMenu.dia = this.sfecha;

    this.menuService.añadirMenu(this.nuevoMenu).subscribe(
      result=>{
        this.registroCorrecto=true;
        this.existeComida=false;
      console.log(result);
      },error=>{
        this.msgError = error.error;
      }
    )
  }

  resetearIntento() {
    this.registroCorrecto=false;
    this.registroIncorrecto = false;
  }

  volver() {
    this.router.navigate(['menu-cocinera']);
  }
}
