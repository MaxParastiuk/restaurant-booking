import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToWords',
})
export class CamelCaseToWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    let result = '';
    for (let i = 0; i < value.length; i++) {
      if (value[i] === value[i].toUpperCase() && i !== 0) {
        console.log('hello', value[i]);
        result += ' ' + value[i].toLowerCase();
      } else {
        result += value[i];
      }
    }

    return result;
  }
}
