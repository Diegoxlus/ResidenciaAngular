import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {PagoService} from '../../servicios/pago.service';
import {Pago} from '../../models/pago';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faClock} from '@fortawesome/free-solid-svg-icons/faClock';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {Parte} from '../../models/parte';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';

@Component({
  selector: 'app-lista-pagos',
  templateUrl: './lista-pagos.component.html',
  styleUrls: ['./lista-pagos.component.css']
})
export class ListaPagosComponent implements OnInit {

  displayedColumns: string[] = ['Residente', 'Estado','Gestionar', 'Descargar'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  selectedYearAsText: string;
  selectedMonthIndex: number;
  selectedMonthAsText: string;
  dialogRef2: any;
  opcion:number = 0;
  pagos:Array<Pago>;
  descargar = faDownload;
  espera = faClock;
  correcto = faCheckCircle;
  incorrecto = faTimesCircle;
  eliminar = faTrashAlt;
  dataSource : MatTableDataSource<Pago>;

  constructor( private pagoService: PagoService, private dialog: MatDialog) {
    this.pagos = new Array<Pago>();
    this.dataSource = new MatTableDataSource<Pago>();

  }

  ngOnInit() {
    this.refresh();
  }

  onChange(event: { monthIndex: number, year: number }) {
    this.selectedYearAsText = event.year.toString();
    this.selectedMonthIndex = event.monthIndex;
    this.selectedMonthAsText = moment().month(event.monthIndex).format('MMMM');

    this.refresh();
  }

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

  private verificarPago(pago:Pago){
    this.pagoService.verificarPago(pago).subscribe(
      result=>{
        if(result==true){
          this.refresh();
        }
      },error=>{

      }
    )

  }

  private rechazarPago(pago:Pago){
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
