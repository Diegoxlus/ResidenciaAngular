import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {take, takeUntil} from 'rxjs/operators';
import {Usuario} from '../../models/usuario';
import {UsuarioService} from '../../servicios/usuario.service';

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

  /** list of banks filtered by search keyword */
  public filteredUsuarioMulti: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();


  constructor(private usuarioService: UsuarioService) {
    this.residentes = new Array<Usuario>();
    this.selecionResidentes = new Array<string>();
  }

  ngOnInit() {

    this.usuarioService.getResidentesHabitacion().subscribe(result=>{
      for (let residente of result){
        console.log("ONINIT EJECUTANDO...");
        this.residentes.push(new Usuario(residente.nombre,residente.apellidos,residente.email,null,null,null,null,residente.numero));
      }
    },error =>{


    });


    // set initial selection
    //this.bankMultiCtrl.setValue([this.banks[10], this.banks[11], this.banks[12]]);

    // load the initial bank list
    this.filteredUsuarioMulti.next(this.residentes);

    // listen for search field value changes
    this.usuarioMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {

        this.filterBanksMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

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

  protected filterBanksMulti() {
    if (!this.residentes || this.usuarioMultiCtrl.value.length>1) {
      return;
    }
    // get the search keyword
    let search = this.usuarioMultiFilterCtrl.value;
    console.log(search);
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

  changed() {
    if (this.usuarioMultiCtrl.value.length < 3) {
      this.selecionResidentes = this.usuarioMultiCtrl.value;
    } else {
      this.usuarioMultiCtrl.setValue(this.selecionResidentes);
    }
  }

  restart() {
    this.selecionResidentes = [];
    this.residentes = [];
    this.changed();
    this.ngOnInit();
    this.usuarioMultiCtrl.reset();
    this.usuarioMultiFilterCtrl.reset();



  }
}
