import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';

/**
 * Componente que permite crear un Dialogo de confirmación, que se puede importar en otros componentes.
 */
@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent {

  constructor(public dialogRef: MatDialogRef<DialogoConfirmacionComponent>) {}
  public confirmMessage:string;



}
