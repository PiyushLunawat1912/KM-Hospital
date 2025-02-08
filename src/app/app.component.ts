// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from './service/appointment.service';

import GLightbox from 'glightbox';

import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';  // Import AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'km-hospital';
  isMenuActive: boolean = false;
  isLoggedIn: boolean = false;  // Track login status

  appointment = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  };

  successMessage = '';
  errorMessage = '';

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit(): void {
    

    // Initialize GLightbox for image galleries
    GLightbox({
      selector: '.glightbox',
    });

    // Subscribe to login status
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;  // Update the login status
    });

    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn = true;
    }
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  closeMenu(): void {
    this.isMenuActive = false;
  }

  onLogin() {
    this.router.navigate(['admin/login']);
  }

  manageAppointments() {
    this.router.navigate(['appointments']);
  }
 
  // Scroll to the appointment section
  scrollToAppointment(): void {
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Submit the appointment form
  submitAppointment(): void {
    this.appointmentService.createAppointment(this.appointment).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.appointment = {
          name: '',
          lastName: '',
          email: '',
          phone: '',
          date: '',
          message: '',
        };
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit appointment. Please try again.';
        console.error('Error:', error);
      },
    });
  }

 

  // Handle logout
  onLogout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.authService.logout();  // Call logout from AuthService
    this.router.navigate(['/']);  // Navigate to home page after logout
  }
}
