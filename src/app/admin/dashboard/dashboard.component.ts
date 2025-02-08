import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment.service';
import { Router } from '@angular/router';  // Import Router for navigation


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {

  appointments: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private router: Router  // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  // Method to load appointments
  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe({
      next: (response) => {
        this.appointments = response.appointments;  // Assuming response has 'appointments' array
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
      }
    });
  }

  // Logout method
  onLogout() {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Navigate to home page after logout
    this.router.navigate(['home']);
  }
}
