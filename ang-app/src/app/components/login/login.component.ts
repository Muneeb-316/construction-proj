import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };
  
  isLoading = false;
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';
    
    // Validate form
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }
    
    // Show loading state
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any email/password combination
      // In a real app, you would validate against your backend
      if (this.loginData.email && this.loginData.password) {
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        if (this.loginData.rememberMe) {
          localStorage.setItem('userEmail', this.loginData.email);
        }
        
        // Show success message
        this.successMessage = 'Login successful! Redirecting...';
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
      
      this.isLoading = false;
    }, 1500);
  }

  forgotPassword(): void {
    // In a real app, this would navigate to a password reset page
    alert('Password reset functionality would be implemented here');
  }
}
