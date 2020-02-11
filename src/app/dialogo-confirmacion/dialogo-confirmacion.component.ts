import { Component, Input } from '@angular/core';
import {MatDialog,MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent {

  constructor(public dialogRef: MatDialogRef<DialogoConfirmacionComponent>) {}
  public confirmMessage:string;



}
