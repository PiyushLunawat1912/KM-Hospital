import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;
  
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.message = 'Login successful!';
        localStorage.setItem('token', response.token); // Store token
        this.router.navigate(['/admin/dashboard']); // Redirect to dashboard
      },
      error: (error) => {
        // Display message when the email is not allowed to log in
        if (error.status === 403) {
          this.message = 'Error: This email is not authorized to log in.';
        } else {
          this.message = 'Error: ' + (error.error.message || 'Login failed');
        }
      }
    });
  }
  
}  