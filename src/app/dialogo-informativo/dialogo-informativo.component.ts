import { Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

/**
 * Componente que permite crear un Dialogo informativo, que se puede importar en otros componentes.
 */
@Component({
  selector: 'app-dialogo-informativo',
  templateUrl: './dialogo-informativo.component.html',
  styleUrls: ['./dialogo-informativo.component.css']
})
export class DialogoInformativoComponent{

  constructor(public dialogRef: MatDialogRef<DialogoInformativoComponent>) {}
  public mensage:string;
  public titulo : string;



}
