import { Component, OnInit } from '@angular/core';
import {faUtensilSpoon, faBookOpen, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';

@Component({
  selector: 'app-menu-residente',
  templateUrl: './menu-residente.component.html',
  styleUrls: ['./menu-residente.component.css']
})
export class MenuResidenteComponent implements OnInit {
  iconoComida = faUtensilSpoon;
  iconoAnotar = faBookOpen;
  iconoNoticia = faNewspaper;
  iconoPago  = faMoneyCheckAlt

  constructor( private router: Router) {
  }

  ngOnInit() {
  }

  irVerComidas() {
    this.router.navigate(['menu-mensual']);
  }

  irAnotarseComidas() {
    this.router.navigate(['lista-anotarse-comida']);
  }

  irVerNoticias() {
    this.router.navigate(['lista-noticias']);

  }

  irGestionPagosResidente() {
    this.router.navigate(['gestion-pagos-residente']);

  }
}
