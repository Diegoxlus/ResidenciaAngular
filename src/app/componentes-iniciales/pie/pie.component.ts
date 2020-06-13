import { Component, OnInit } from '@angular/core';

/**
 * Variable Jquery
 */
declare var $: any;

/**
 * Componente que controla el pie de página.
 */
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponentComponent implements OnInit {
  /**
   * Constructor vacio del componente.
   */
  constructor() { }

  /**
   * Mediante jQuery indicamos que al pinchar sobre el link de subir haga una animación de scroll que va
   * desde el pie hasta la cabecera.
   */
  ngOnInit() {
    $('.linkSubir').click((e) => {
      e.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });
  }

}
