import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import {Noticia} from '../../models/noticia';
import {NoticiaService} from '../../servicios/noticia.service';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {DialogoInformativoComponent} from '../../dialogo-informativo/dialogo-informativo.component';
import {DialogoConfirmacionComponent} from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {Router} from '@angular/router';
import {DatosNoticiaService} from '../../servicios/datos-noticia.service';

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Fecha', 'Titulo', 'Acciones'];
  arrayNoticias: Array<Noticia>;
  dataSource = new MatTableDataSource<Noticia>();
  detalles = faInfo;
  eliminar = faTrashAlt;
  editar = faEdit;

  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  dialogRef2: any ;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cdr : ChangeDetectorRef,private router: Router,private datosNoticiaService: DatosNoticiaService,private noticiaService: NoticiaService, public dialog: MatDialog){
    this.arrayNoticias = new Array<Noticia>()
  }

  ngOnInit() {
    this.noticiaService.getNoticias().subscribe(
      noticias=>{
        for (let noticia of noticias){
          this.arrayNoticias.push(new Noticia(noticia.id,noticia.titulo,noticia.descripcion,noticia.dia));
        }
        console.log(this.arrayNoticias);
        this.dataSource = new MatTableDataSource<Noticia>(this.arrayNoticias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Noticias por pagina";

      },error=>{

      }
    );
  }

  abrirDialogoInformarivo(noticia: Noticia) {
    this.dialogRef = this.dialog.open(DialogoInformativoComponent, {
      disableClose: false,

    });
    this.dialogRef.componentInstance.titulo =noticia.dia+' '+noticia.titulo;
    this.dialogRef.componentInstance.mensage = noticia.descripcion;

    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
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

  openConfirmationDialogE(noticia: Noticia) {
    this.dialogRef2 = this.dialog.open(DialogoConfirmacionComponent, {
      disableClose: false
    });
    this.dialogRef2.componentInstance.confirmMessage = "Estas seguro de que quieres eliminar la noticia";

    this.dialogRef2.afterClosed().subscribe(result => {
      if(result) {
        this.eliminarNoticia(noticia);
      }
      this.dialogRef2 = null;
    });
  }

  private eliminarNoticia(noticia: Noticia) {
    this.noticiaService.eliminarNoticia(noticia.id).subscribe(
      result=>{
        this.refresh();
      }, error=>{
        this.abrirDialogoInfoError(error.error);
      }
    )
  }

  private editarNoticia(noticia:Noticia) {
    this.datosNoticiaService.noticia= noticia;
    this.router.navigate(['/editar-noticia']);

  }

  refresh() {
    this.arrayNoticias = [];
    this.noticiaService.getNoticias().subscribe(
      noticias=>{
        for (let noticia of noticias){
          this.arrayNoticias.push(new Noticia(noticia.id,noticia.titulo,noticia.descripcion,noticia.dia));
        }
        console.log(this.arrayNoticias);
        this.dataSource = new MatTableDataSource<Noticia>(this.arrayNoticias);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator._intl.itemsPerPageLabel="Noticias por pagina";

      },error=>{
        this.abrirDialogoInfoError(error.error);

      }
    )
  }

  ngAfterViewInit(): void {

  }




}







