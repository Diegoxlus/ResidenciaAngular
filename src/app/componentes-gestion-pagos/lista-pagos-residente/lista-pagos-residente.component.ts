import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {Router} from '@angular/router';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
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

  displayedColumns: string[] = ['Mes', 'Realizado','Verificado',"Descargar"];
  pagos : Array<Pago>;
  dataSource : MatTableDataSource<Pago>;
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  dialogRef2: any ;
  descargar = faDownload;
  espera = faClock;
  correcto = faCheckCircle;
  incorrecto = faTimesCircle;


  constructor(private pagoService:PagoService,private router: Router,public dialog: MatDialog) {
    this.pagos = new Array<Pago>();
    this.dataSource = new MatTableDataSource<Pago>();
  }


  ngOnInit(): void {
    this.pagoService.getPagoResidente().subscribe(
      pagos => {
        for (let pago of pagos){
          this.pagos.push(new Pago(pago.id,pago.residente,pago.dia,pago.extension,pago.mes,pago.correcto,'',''));
        }
        this.dataSource.data = this.pagos;
        console.log(pagos);
      }
    )
  }


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



  abrirDialogoInfoError(error) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.mensage = error;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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
