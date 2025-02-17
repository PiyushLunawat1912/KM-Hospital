import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';


import { AppService } from '../app-service.service';
  import { AppointmentService } from '../service/appointment.service';
  

  interface ImageItem {
    url: string;
    name: string;
  }
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
 
    // Reference to the appointment section
    @ViewChild('appointmentSection') appointmentSection!: ElementRef;
  
    // Appointment form data
    appointment = {
      name: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      message: '',
    };
  
    // Messages for form submission
    successMessage = '';
    errorMessage = '';
  
    constructor(
      private appService: AppService,
      private appointmentService: AppointmentService
    ) {}
  
    ngAfterViewInit(): void {
      // Lazy load and animation logic
      this.lazyLoadAnimations();
  
      // Subscribe to the event emitted by AppService to trigger scroll
      this.appService.scrollToAppointment$.subscribe(() => {
        this.scrollToAppointment(); // Call scroll method when event is triggered
      });
    }
  
    // Scroll to the appointment section
    scrollToAppointment(): void {
      if (this.appointmentSection) {
        this.appointmentSection.nativeElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  
    // Lazy load and apply animations to elements as they appear in the viewport
    lazyLoadAnimations(): void {
      const lazyElements = document.querySelectorAll<HTMLElement>('.lazy-load');
  
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const animation = element.getAttribute('data-animation') || 'fade-in';
              const delay = element.getAttribute('data-delay') || '0';
  
              // Apply animation styles
              element.style.animation = `${animation} 0.6s ease ${delay}ms forwards`;
              element.classList.add('visible'); // Ensure visibility class is added
              observer.unobserve(element);
            }
          });
        },
        { root: null, threshold: 0.1 } // Trigger when 10% of the element is visible
      );
  
      lazyElements.forEach((element) => observer.observe(element));
    }
  
    // Submit the appointment form
    submitAppointment(): void {
      console.log('Submitting appointment:', this.appointment); // Debug log
  
      this.appointmentService.createAppointment(this.appointment).subscribe({
        next: (response) => {
          console.log('Response from server:', response); // Debug log
          this.successMessage = response.message;
          this.errorMessage = '';
          this.resetForm(); // Reset the form after success
        },
        error: (error) => {
          console.error('Error from server:', error); // Debug log
          this.errorMessage = 'Failed to submit appointment. Please try again.';
        },
      });
    }
  
    // Reset the form
    resetForm(): void {
      this.appointment = {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        message: '',
      };
    }
    images: ImageItem[] = [
      {url:'assets/img/gallery/Hospital3.jpg', name:"KM Homspital"},
       {url:'assets/img/gallery/Hospital9.jpg',name:"Passage"},
      {url: 'assets/img/gallery/Hospital1.jpg',name:"Reception"},
       {url:'assets/img/gallery/Hospital7.jpg',name:"OPD"},
       {url:'assets/img/gallery/Hospital8.jpg',name:"OPD"},
       {url:'assets/img/gallery/Hospital4.jpg', name:"Semi Private Room"},
       {url:'assets/img/gallery/Hospital10.jpg',name:"Semi Private Room"},
       {url:'assets/img/gallery/Hospital13.jpg',name:"Dulex Room"},
       {url:'assets/img/gallery/Hospital12.jpg',name:"Dulex Room"},
       {url:'assets/img/gallery/Hospital2.jpg',name:"Recovery Ward"},
       {url:'assets/img/gallery/Hospital6.jpg',name:"General Ward"},
       {url:'assets/img/gallery/Hospital11.jpg',name:"General Ward"},
      
     ];
    
    


}
