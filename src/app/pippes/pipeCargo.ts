import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'rolToString' })
export class pipeCargo implements PipeTransform {
  transform(numero : number) {
    if(numero==0) return "Director/a";
    if(numero==1) return "Secretario/a";
    if(numero==2) return "Cocinero/a";
    if(numero==3) return "Residente/a";

  }

}
