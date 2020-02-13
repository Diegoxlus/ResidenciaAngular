import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Usuario} from '../models/usuario.model';
import {UsuarioService} from '../servicios/usuario.service';
import {Router} from '@angular/router';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {DialogoConfirmacionComponent} from '../dialogo-confirmacion/dialogo-confirmacion.component';




/**
 * @title Table with filtering
 */
@Component({
  selector: 'tabla-trabajadores',
  styleUrls: ['trabajadores.component.css'],
  templateUrl: 'trabajadores.component.html',
})
export class TrabajadoresComponent implements OnInit,AfterViewInit{
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Cargo', 'Acciones'];
  trabajadores : Array<Usuario>;
  dataSource : any;
  detalles = faInfoCircle;
  eliminar = faTrashAlt;

  constructor(private usuarioService:UsuarioService,private router: Router,public dialog: MatDialog) {
    this.trabajadores = new Array<Usuario>();
  }

  openConfirmationDialog(usuario:Usuario) {
    this.dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar a "+usuario.nombre+" "+usuario.apellidos;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarTrabajador(usuario);
      }
      this.dialogRef = null;
    });
  }

  ngOnInit(): void {
    this.usuarioService.getTrabajadores().subscribe(
      result => {
        for (let trabajador of result){
          this.pipeRol(trabajador);
          this.trabajadores.push(trabajador);
        }

        this.dataSource = new MatTableDataSource(this.trabajadores);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  eliminarTrabajador(trabajador: Usuario){
    let email = trabajador.email;
    this.usuarioService.eliminarTrabajador(email).subscribe((respuesta)=>{
      if(respuesta==true || respuesta=="true"){
        this.trabajadores.splice(0,this.trabajadores.length);
        this.ngOnInit();
      }
    });
  }

  private pipeRol(trabajador: Usuario) {
    switch (trabajador.rol) {
      case 0: trabajador.rol="Director/a";
        break;
      case 1: trabajador.rol="Secretario/a";
        break;
      case 2: trabajador.rol="Cocinero/a";
        break;
      case 3: trabajador.rol="Residente/a";
        break;

    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit(): void {
  }
}

