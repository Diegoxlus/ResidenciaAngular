import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../servicios/usuario.service';

/**
 * Componente empleado para seleccionar residentes, con la finalidad de añadirlos a las habitaciones.
 */
@Component({
  selector: 'app-select-residentes',
  templateUrl: './select-residentes.component.html',
  styleUrls: ['./select-residentes.component.css']
})
export class SelectResidentesComponent implements OnInit, AfterViewInit, OnDestroy {

  /** list of banks */
  public selecionResidentes: string[];
  protected residentes: Usuario[];

  /** control for the selected bank for multi-selection */
  public usuarioMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public usuarioMultiFilterCtrl: FormControl = new FormControl();
  @Input('tipo') tipo: number = 0;
  /** list of banks filtered by search keyword */
  public filteredUsuarioMulti: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  /**
   * Al constructor se le pasa el usuarioService, para obtener un JSON con los usuarios.
   * @param usuarioService
   */
  constructor(private usuarioService: UsuarioService) {
    this.residentes = new Array<Usuario>();
    this.selecionResidentes = new Array<string>();
  }

  /**
   * Al iniciar el componente obtenemos los residentes registrados en el sistema, y se insertan en el
   * array de residentes.
   */
  ngOnInit() {

    this.usuarioService.getResidentesHabitacion().subscribe(result=>{
      (result);
      for (let residente of result){
        this.residentes.push(new Usuario(residente.nombre,residente.apellidos,residente.email,null,null,null,null,residente.numero));
      }
    },error =>{


    });


    // set initial selection
    //this.bankMultiCtrl.setValue([this.banks[10], this.banks[11], this.banks[12]]);

    // load the initial bank list
    /**
     * Se carga la lista inicial de residentes.
     */
    this.filteredUsuarioMulti.next(this.residentes);

    // listen for search field value changes
    /**
     * Obtiene los cambios y actualiza el componente
     */
    this.usuarioMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {

        this.filterBanksMulti();
      });
    (this.selecionResidentes);
  }

  /**
   * Antes de que se inicia la vista llama al metodo setIitialValue()
   */
  ngAfterViewInit() {
    this.setInitialValue();
  }

  /**
   * Al destruir el componente
   */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredUsuarioMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {

        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Usuario, b: Usuario) => a && b && a.email === b.email;
      });
  }

  /**
   * Permite realizar la busqueda de residentes.
   */
  protected filterBanksMulti() {
    /*if (this.usuarioMultiCtrl!=null && (!this.residentes || this.usuarioMultiCtrl.value.length>1)) {
      return;
    }*/
    // get the search keyword
    let search = this.usuarioMultiFilterCtrl.value;
    if (!search) {
      this.filteredUsuarioMulti.next(this.residentes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredUsuarioMulti.next(
      this.residentes.filter(residente => (residente.nombre +" "+residente.apellidos).toLowerCase().indexOf(search) > -1)
    );
  }

  /**
   * Permite que se seleccionen 1 o 2 residentes del select, dependiendo de si el valor tipo es
   * 0 o 1.
   */
  changed() {
    if(this.usuarioMultiCtrl.value!=null) {

      if (this.usuarioMultiCtrl.value.length < 2 + this.tipo) {
        this.selecionResidentes = this.usuarioMultiCtrl.value;
      } else {
        if (this.selecionResidentes.length == 2 && this.tipo == 0) {
          this.selecionResidentes.pop();
        }
        this.usuarioMultiCtrl.setValue(this.selecionResidentes);
      }
    }
  }
}
