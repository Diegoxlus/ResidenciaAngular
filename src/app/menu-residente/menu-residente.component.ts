import { Component, OnInit } from '@angular/core';
import {faUtensilSpoon, faBookOpen, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {faMoneyCheckAlt} from '@fortawesome/free-solid-svg-icons/faMoneyCheckAlt';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';

@Component({
  selector: 'app-menu-residente',
  templateUrl: './menu-residente.component.html',
  styleUrls: ['./menu-residente.component.css']
})
export class MenuResidenteComponent implements OnInit {
  iconoComida = faUtensilSpoon;
  iconoAnotar = faBookOpen;
  iconoNoticia = faNewspaper;
  iconoPago  = faMoneyCheckAlt;
  iconoFinde = faCalendarCheck;

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
    this.router.navigate(['mis-pagos']);

  }

  irVerPermanencia() {
    this.router.navigate(['mi-permanencia']);

  }
}
