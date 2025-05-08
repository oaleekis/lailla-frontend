import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brl'
})
export class BrlPipe implements PipeTransform {
  transform(value: number | string): string {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numberValue)) return '0,00';
    return numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
