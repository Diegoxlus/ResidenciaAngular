import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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

/**
 * Componente empleado para listar las noticas junto a las opciones, este componente es para la secretaria
 * o la directora.
 */
@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit{
  /**
   * Columnas que va a tener la tabla.
   */
  displayedColumns: string[] = ['Fecha', 'Titulo', 'Acciones'];
  /**
   * Array donde se van a almacenar las noticias obtenidas de la API REST.
   */
  arrayNoticias: Array<Noticia>;
  /**
   * Empleado para pasar los datos a la tabla.
   */
  dataSource = new MatTableDataSource<Noticia>();

  /**
   * Empleado para mostrar un dialogo informativo.
   */
  dialogRef: MatDialogRef<DialogoInformativoComponent>;
  /**
   * Empleado para mostrar un dialogo de confiramción
   */
  dialogRef2: any ;

  /**
   * Contiene un componente hijo, que es un paginador para poder dividir las noticias comodamente.
   */
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   * Constructor del componente
   * cdr: Empleado para detectar cambios en el paginator.
   * router: Para navegar entre componentes.
   * datosNoticiaService: Para pasar la noticia al componente que se encarga de editarla.
   * dialog: Para mostrar el dialogo informativo.
   * @param cdr
   * @param router
   * @param datosNoticiaService
   * @param noticiaService
   * @param dialog
   */
  constructor(private cdr : ChangeDetectorRef,public router: Router,private datosNoticiaService: DatosNoticiaService,private noticiaService: NoticiaService, public dialog: MatDialog){
    this.arrayNoticias = new Array<Noticia>()
  }

  /**
   * Obtenemos las noticias que ya existen en el sistema y las almacenamos en un array de noticias.
   * Inicializamos y cambiamos el string del paginator para que aparezca en español.
   */
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

  /**
   * Abrimos el dialogo informativo para poder ver de forma detallada la noticia.
   * @param noticia
   */
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

  /**
   * Abrimos el dialogo de error en el caso de que no se pueda eliminar la noticia.
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
   * Abrimos el dialogo de confirmación de borrado para confirmar que queremos eliminar la noticia.
   * @param noticia
   */
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

  /**
   * Metodo empleado para eliminar una notica, se le pasa la noticia al método y posteriormente el id
   * de ala noticia al servicio.
   * @param noticia
   */
  private eliminarNoticia(noticia: Noticia) {
    this.noticiaService.eliminarNoticia(noticia.id).subscribe(
      result=>{
        this.refresh();
      }, error=>{
        this.abrirDialogoInfoError(error.error);
      }
    )
  }

  /**
   * Metodo empleado para navegar al componente de edición.
   * Se le pasa la noticia al servicio, para poder obtenerla en el componente de edición.
   * @param noticia
   */
  public editarNoticia(noticia:Noticia) {
    this.datosNoticiaService.noticia= noticia;
    this.router.navigate(['/editar-noticia']);

  }

  /**
   * Metodo empleado para refrescar el array de noticias y el paginator.
   */
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






}







