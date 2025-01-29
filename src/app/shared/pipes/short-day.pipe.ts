import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDay',
})
export class ShortDayPipe implements PipeTransform {
  private daysMap: { [key: string]: string } = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };
  transform(value: string): string {
    return this.daysMap[value] || value;
  }
}
