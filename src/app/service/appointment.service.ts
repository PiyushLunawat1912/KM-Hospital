import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://192.168.29.104:3000/api/appointments'; // Ensure this matches your backend

  constructor(private http: HttpClient) {}

  // Send POST request to create an appointment
  createAppointment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data); // Sends data as JSON
  }
   // Method to get appointments
   getAppointments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
