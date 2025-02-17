import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components for your app
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AppointmentsComponent } from './appointments/appointments.component'; 
// Import Admin components
import { DashboardComponent } from './admin/dashboard/dashboard.component'; // Admin Dashboard
import { SignupComponent } from './admin/signup/signup.component'; // Admin Signup
import { LoginComponent } from './admin/login/login.component'; // Admin Login
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  // Public routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'contact', component: ContactUsComponent },

  // Admin routes
  { path: 'admin/dashboard', component: DashboardComponent }, // Admin Dashboard Route
  { path: 'admin/signup', component: SignupComponent }, // Admin Signup Route
  { path: 'admin/login', component: LoginComponent }, // Admin Login Route

  // Any other routes you might need
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
