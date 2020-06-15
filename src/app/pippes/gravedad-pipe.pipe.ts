import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gravedadPipe'
})
export class GravedadPipePipe implements PipeTransform {

  transform(numero:number): any {
    if(numero==0) return "Leve";
    if(numero==1) return "Grave";
    if(numero==2) return "Muy grave";
  }

}
