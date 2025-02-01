import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service'; // Import authentication service

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  message: string = '';  // To hold the success or error message

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSignup() {
    if (this.signupForm.invalid) return;

    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.message = 'Signup successful!';  // Success message
        this.router.navigate(['/admin/login']); // Redirect to login page after successful signup
      },
      error: (error) => {
        // Handle error when the email is not allowed to sign up
        if (error.status === 403) {
          this.message = 'Error: This email is not authorized to sign up.';
        } else {
          this.message = 'Error: ' + (error.error.message || 'Signup failed');
        }
      }
    });
  }
}
