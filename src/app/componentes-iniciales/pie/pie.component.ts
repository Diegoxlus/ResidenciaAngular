import { Component, OnInit } from '@angular/core';

declare var Jquery: any;
declare var $: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css'],
})
export class PieComponentComponent implements OnInit {

  constructor() { }

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
