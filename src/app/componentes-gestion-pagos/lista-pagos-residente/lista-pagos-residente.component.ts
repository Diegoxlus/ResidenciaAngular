import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {Router} from '@angular/router';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {PagoService} from '../../servicios/pago.service';
import {Pago} from '../../models/pago';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';

@Component({
  selector: 'app-lista-pagos-residente',
  templateUrl: './lista-pagos-residente.component.html',
  styleUrls: ['./lista-pagos-residente.component.css']
})
export class ListaPagosResidenteComponent implements OnInit {
  /**
   * Columnas empleadas en la tabla de pagos
   */
  displayedColumns: string[] = ['Mes', 'Realizado','Verificado',"Descargar"];
  /**
   * Array donde se almacenan los pagos
   */
  pagos : Array<Pago>;
  /**
   * Variable empleada para pasara el array de pagos a la tabla.
   */
  dataSource : MatTableDataSource<Pago>;
  /**
   * Variable empleada para mostrar el dialogo de error
   */
  dialogRef: MatDialogRef<DialogoInformativoComponent>;

  /**
   * Icono descargar pago
   */
  descargar = faDownload;
  /**
   * Icono pago pendiente
   */
  espera = faClock;
  /**
   * Icono pago correcto
   */
  correcto = faCheckCircle;
  /**
   * Icono pago incorrecto
   */
  incorrecto = faTimesCircle;

  /**
   * Constructor del componente, se instancia:
   * pagoService: Servicio para comunicarnos con la API REST
   * dialog: Empleado para mostrar el dialogo error
   * router: Para navegar entre componentes
   * @param pagoService
   * @param router
   * @param dialog
   */
  constructor(private pagoService:PagoService,public router: Router,public dialog: MatDialog) {
    this.pagos = new Array<Pago>();
    this.dataSource = new MatTableDataSource<Pago>();
  }

  /**
   * En el ngOnInit obtenemos los pagos que pertenecen al residente y rellenamos el array pagos.
   */
  ngOnInit(): void {
    this.pagoService.getPagoResidente().subscribe(
      pagos => {
        for (let pago of pagos){
          this.pagos.push(new Pago(pago.id,pago.residente,pago.dia,pago.extension,pago.mes,pago.correcto,'',''));
        }
        this.dataSource.data = this.pagos;
      }
    )
  }

  /**
   * Vuelve a llenar el array de pagos.
   */
  refresh() {
    this.pagos = [];
    this.pagoService.getPagoResidente().subscribe(
      pagos => {
        for (let pago of pagos){
          this.pagos.push(new Pago(pago.id,pago.residente,pago.dia,pago.extension,pago.mes,pago.correcto,'',''));
        }
        this.dataSource.data = this.pagos;
      }
    )
  }


  /**
   * Abre el dialogo de error en el caso de que se produzca un error al eliminar el pago.
   * @param error
   */
  abrirDialogoInfoError(error) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.mensage = error;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }


  /**
   * Filtro para buscar por los campos de la tabla
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Permite descargar un pago que realizado por el residente.
   * @param pago
   */
  descargarPago(pago: Pago) {
    this.pagoService.descargarPago(pago).subscribe(
      result=>{
        console.log(result);
        const blob: Blob = new Blob([result], {type:result.type});
        const fileName: string = "Pago-Residencia ("+pago.mes+')';
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
      }
    )
  }


}
