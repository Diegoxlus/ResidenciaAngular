import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import {Router} from '@angular/router';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../servicios/usuario.service';
import {pipeCargo} from '../../pippes/pipeCargo';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  residentes: Array<Usuario>;
  trabajadores: Array<Usuario>;
  public searchString: string;
  vista: boolean; //Vista a true para los residentes

  constructor(private usuarioService:UsuarioService,private router: Router) {
    this.residentes = new Array<Usuario>();
    this.trabajadores = new Array<Usuario>();
    this.vista=true;
  }

  ngOnInit() {



  }


  eliminar(email: string) {
    console.log(email);
  }
}
