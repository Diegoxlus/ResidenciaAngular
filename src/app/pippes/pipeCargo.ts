import { Pipe, PipeTransform } from '@angular/core';


@Pipe({ name: 'rolToString' })
export class pipeCargo implements PipeTransform {
  transform(numero : number) {
    if(numero==0) return "Directora";
    if(numero==1) return "Secretaria";
    if(numero==2) return "Cocinera";
    if(numero==3) return "Residente";

  }

}
