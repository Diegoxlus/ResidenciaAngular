import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario';
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {UsuarioService} from '../../servicios/usuario.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {DatosUsuarioService} from '../../servicios/datos-usuario.service';

@Component({
  selector: 'tabla-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css'],
})
export class ResidentesComponent implements OnInit {
  dialogRef: MatDialogRef<DialogoConfirmacionComponent>;
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Habitacion', 'Acciones'];
  residentes : Array<Usuario>;
  dataSource : any;
  detalles = faInfoCircle;
  eliminar = faTrashAlt;

  constructor(private usuarioService:UsuarioService,private router: Router,public dialog: MatDialog, private datosUsuario: DatosUsuarioService ) {
    this.residentes = new Array<Usuario>();
  }

  openConfirmationDialog(usuario:Usuario) {
    this.dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar a "+usuario.nombre+" "+usuario.apellidos;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarResidente(usuario);
      }
      this.dialogRef = null;
    });
  }

  ngOnInit(): void {
    this.usuarioService.getResidentesHabitacion().subscribe(
      result => {
        for (let residente of result){
          this.residentes.push(residente);
        }

        this.dataSource = new MatTableDataSource(this.residentes);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  eliminarResidente(trabajador: Usuario){
    let email = trabajador.email;
    this.usuarioService.eliminarResidente(email).subscribe((respuesta)=>{
      if(respuesta==true || respuesta=="true"){
        this.residentes.splice(0,this.residentes.length);
        this.ngOnInit();
      }
    });
  }

  irAEditarResidente(residente: Usuario): void{
    console.log(residente);
    this.datosUsuario.cambiarUsuario(residente);
    console.log(this.datosUsuario.usuario);
    this.router.navigate(['modificar-residente']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
