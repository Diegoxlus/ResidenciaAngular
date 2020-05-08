import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habitacionToString'
})
export class HabitacionPipe implements PipeTransform {

  transform(numero:number): any {
    if(numero==0) return "Individual";
    if(numero==1) return "Doble";
  }

}
