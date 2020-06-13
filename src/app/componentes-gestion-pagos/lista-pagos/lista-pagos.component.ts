import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {PagoService} from '../../servicios/pago.service';
import {Pago} from '../../models/pago';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';

/**
 * Componente que permite a la secretaria gestionar los pagos realizados por los residentes.
 */
@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.css']
})

export class ListaPagosComponent implements OnInit {
  /**
   * Columnas empleadas en la tabla de pagos
   */
  displayedColumns: string[] = ['Residente', 'Estado','Gestionar', 'Descargar'];

  /**
   * Componente hijo,corrasponde al paginador para la tabla.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  /**
   * Variable empleada para almacenar el año seleccionado.
   */
  selectedYearAsText: string;
  /**
   * Variable empleada para almacenar el mes seleccionado como numero:
   * 0 Enero
   * 1 Febrero
   * 2 Marzo
   * ...
   * 11 Diciembre
   */
  selectedMonthIndex: number;
  /**
   * Variable empleada para almacenar el año seleccionado.
   */
  selectedMonthAsText: string;
  /**
   * Variable empleada para mostrar el dialogo de error
   */
  dialogRef2: any;
  /**
   * Opcion que permite a la secretaria mostrar una tabla o otra dependiento del estado del pago:
   * 0 Pendiente
   * 1 Aceptado
   * 2 Rechazado
   */
  opcion:number = 0;
  /**
   * Array donde se almacenan los pagos
   */
  pagos:Array<Pago>;
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
   * Icono eliminar
   */
  eliminar = faTrashAlt;
  /**
   * Variable empleada para pasara el array de pagos a la tabla.
   */
  dataSource : MatTableDataSource<Pago>;

  /**
   * Constructor del componente, se instancia:
   * pagoService: Servicio para comunicarnos con la API REST
   * dialog: Empleado para mostrar el dialogo de confirmación de borrado
   * @param pagoService
   * @param dialog
   */
  constructor( private pagoService: PagoService, private dialog: MatDialog) {
    this.pagos = new Array<Pago>();
    this.dataSource = new MatTableDataSource<Pago>();

  }

  /**
   * Llamamos al metodo refresh para inicializar el array con la opción 0.
   * El array se llena con los pagos pendientes.
   */
  ngOnInit() {
    this.refresh();
  }

  /**
   * Este metodo se ejecuta cuando se detecta un cambio en el mes del monthPicker
   * Se ontiene el mes y el año selecionado.
   * @param event
   */
  onChange(event: { monthIndex: number, year: number }) {
    this.selectedYearAsText = event.year.toString();
    this.selectedMonthIndex = event.monthIndex;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');

    this.refresh();
  }

  /**
   * Vuelve a llenar el array de pagos dependiendo de el opcion que seleccione la secretaria.
   */
  public refresh(){
    this.pagos = [];
    let mes = (this.selectedMonthIndex+1).toString()+'-'+this.selectedYearAsText;
    console.log(mes);
    this.pagoService.getPagos(mes,this.opcion).subscribe(
      pagos=>{
       if(pagos.lenght == 0){
       }
       else{
         for (let pago of pagos){
           this.pagos.push(new Pago(pago.id,pago.residentes,pago.dia,pago.extension,pago.mes,pago.correcto,pago.nombre,pago.apellidos))
         }
         this.dataSource.data = this.pagos;
         this.dataSource.paginator = this.paginator;
         this.dataSource.paginator._intl.itemsPerPageLabel="Pagos por pagina";

       }
      },error=>{

    }
    )
  }

  /**
   * Permite descargar el pago obtienendolo de la API REST, a la cual se le envia los datos del pago a
   * traves del servicio descargarPago, y este devuelve el pago que es descargado por el navegador.
   * @param pago
   */
  descargarPago(pago: Pago) {
    this.pagoService.descargarPago(pago).subscribe(
      result=>{
        console.log(result);
        const blob: Blob = new Blob([result], {type:result.type});
        const fileName: string = pago.nombre+' '+pago.apellidos+' '+pago.mes;
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

  /**
   * Abre el dialogo de confirmación de borrado.
   * @param pago
   */
  openConfirmationDialogE(pago: Pago) {
    this.dialogRef2 = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef2.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar el pago?";

    this.dialogRef2.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarPago(pago);
      }
      this.dialogRef2 = null;
    });
  }

  /**
   * el pago se borra de la BD y el archivo del servidor, gracias al servicio eliminarPago al cual se le pasa el pago.
   * @param pago
   */
  private eliminarPago(pago: Pago) {
    this.pagoService.eliminarPago(pago).subscribe(
      result=>{
        if(result==true){
          this.refresh();
        }
      },error=>{

      }
    )
  }

  /**
   * Mediante este método la secretaria indica que un pago es correcto.
   * @param pago
   */
  public verificarPago(pago:Pago){
    this.pagoService.verificarPago(pago).subscribe(
      result=>{
        if(result==true){
          this.refresh();
        }
      },error=>{

      }
    )

  }

  /**
   * Mediante este metodo se rechaza el pago seleccionado.
   * @param pago
   */
  public rechazarPago(pago:Pago){
    this.pagoService.rechazarPago(pago).subscribe(
      result=>{
        if(result==true){
          this.refresh();
        }
      },error=>{

      }
    )
  }
}
