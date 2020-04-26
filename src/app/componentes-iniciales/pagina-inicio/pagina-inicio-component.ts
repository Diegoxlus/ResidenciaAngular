import { Component, AfterViewInit } from '@angular/core';
declare var Jquery: any;
declare var $: any;


@Component({
  selector: 'app-pagina-inicio-component',
  templateUrl: './pagina-inicio-component.html',
  styleUrls: ['./pagina-inicio-component.css']
})
export class PaginaInicioComponent implements AfterViewInit {
  public sliders: any[] = [
    {url: '/assets/r1.jpg'},
    {url: '/assets/r2.jpg'},
    {url: '/assets/r3.jpg'}
  ];
  constructor() {
  }
  ngAfterViewInit() {
      $('.bxslider').bxSlider({
        mode: 'fade',
        captions: true,
        auto: true,
        responsive: true,
        slideWidth: 1000,
        pause: 3000,
        controls: false,
        autoControls: true,
        autoControlsCombine: true,
        keyboardEnabled: true
      });
  }

}
