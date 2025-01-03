import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
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
            element.classList.add('visible');
            observer.unobserve(element);
          }
        });
      },
      { root: null, threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    lazyElements.forEach((element) => observer.observe(element));
  }
}
