import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import GLightbox from 'glightbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'km-hospital';

  // Variable to toggle menu visibility on mobile
  isMenuActive: boolean = false;

  ngOnInit(): void {
    AOS.init();  // Initialize AOS (Animate On Scroll)
    
    const lightbox = GLightbox({
      selector: '.glightbox'  // Customize the selector for GLightbox images
    });
  }

  // Function to toggle the mobile menu visibility
  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  // Function to close the mobile menu when any menu item is clicked
  closeMenu(): void {
    this.isMenuActive = false;
  }
}
