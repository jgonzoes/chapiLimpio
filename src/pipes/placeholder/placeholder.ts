import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  transform(valor: string, dafault: string = "Sin Titulo") {
    return ( valor ) ? valor : dafault;
  }
}
