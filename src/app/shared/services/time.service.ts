import { Injectable } from '@angular/core';
import { WorkingHours } from 'src/app/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  getCurrentDay(): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return days[new Date().getDay()];
  }

  isRestaurantOpen(workingHours: WorkingHours): boolean {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const currentDay = this.getCurrentDay();

    if (!workingHours.days.includes(currentDay)) {
      return false;
    }

    const startTime = workingHours.open;
    const endTime = workingHours.close;

    return currentTime >= startTime && currentTime < endTime;
  }
}
