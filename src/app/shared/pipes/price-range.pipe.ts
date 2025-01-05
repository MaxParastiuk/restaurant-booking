import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceRange',
})
export class PriceRangePipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 0 && value < 100) {
      return '$';
    } else if (value >= 100 && value < 250) {
      return '$$';
    } else if (value >= 250 && value < 500) {
      return '$$$';
    } else if (value >= 500 && value < 1000) {
      return '$$$$';
    } else {
      return 'Invalid price';
    }
  }
}
