import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

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
