import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  // Go back to the previous page
  goBack() {
    this.router.navigate(['admin/dashboard']);
  }

  ngOnInit(): void {
    // Fetch all appointments for the manage section
    this.appointmentService.getAllAppointments().subscribe((response: any) => {
      this.appointments = response.appointments;
    });
  }

  // Clear all appointments, show an alert and download the PDF
 // Clear all appointments, show an alert and download the PDF
 clearAllAppointments(): void {
  if (confirm('Are you sure you want to clear all appointments?')) {
    // Download the appointments as PDF before clearing
    this.downloadAppointmentsAsPDF();

    // Call the service to clear all appointments
    this.appointmentService.clearAppointments().subscribe(
      (response) => {
        alert('All appointments have been cleared.');
        this.appointments = []; // Clear the list in the UI
      },
      (error) => {
        console.error('Error clearing appointments:', error);
      }
    );
  }
}

// Format the date to a shorter format (dd-mm-yyyy)
formatDate(date: string): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1; // Months are 0-indexed
  const year = d.getFullYear();
  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
}

// Download appointments as a PDF
downloadAppointmentsAsPDF(): void {
  const doc = new jsPDF();
  let yOffset = 20; // Adjusted for space at the top

  // Add title
  doc.setFontSize(18);
  doc.text('Appointments List', 10, yOffset);
  yOffset += 20;

  // Add table headers
  doc.setFontSize(9);
  doc.text('Name', 10, yOffset);
  doc.text('Email', 50, yOffset);
  doc.text('Phone', 100, yOffset);
  doc.text('Date', 150, yOffset);
  doc.text('Message', 180, yOffset);
  yOffset += 10;

  // Add table rows
  this.appointments.forEach((appointment) => {
    doc.text(`${appointment.name} ${appointment.lastName}`, 10, yOffset);
    doc.text(appointment.email, 50, yOffset);
    doc.text(appointment.phone, 100, yOffset);
    doc.text(this.formatDate(appointment.date), 150, yOffset); // Use formatted date
    doc.text(appointment.message, 180, yOffset);
    yOffset += 10;
  });

  // Save PDF
  doc.save('appointments.pdf');
}
}