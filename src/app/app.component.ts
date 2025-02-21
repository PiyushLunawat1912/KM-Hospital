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
  isLoggedIn = false;
  isMenuActive = false;

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
    // ✅ Subscribe to AuthService login status updates
    this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
    });

    // ✅ Initialize GLightbox
    GLightbox({
      selector: '.glightbox',
    });
  }

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  closeMenu(): void {
    this.isMenuActive = false;
  }

  onLogin(): void {
   
      this.router.navigate(['admin/login']); // ✅ Navigate after login
   
  }

  onLogout(): void {
    this.authService.logout(); // ✅ Logout using AuthService
    this.router.navigate(['/']); // ✅ Redirect to home page
  }

  manageAppointments(): void {
    this.router.navigate(['appointments']);
  }

  
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
    })
  }
}
  
