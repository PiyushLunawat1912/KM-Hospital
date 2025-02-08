import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private scrollToAppointmentSource = new Subject<void>();
  scrollToAppointment$ = this.scrollToAppointmentSource.asObservable();

  triggerScrollToAppointment() {
    this.scrollToAppointmentSource.next();
  }
}
