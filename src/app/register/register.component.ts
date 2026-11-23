import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName = '';
  password = '';
  confirmPassword = '';
  emailAddress = '';

  error = '';
  success = '';

  constructor(private auth: Auth, private router: Router) {

  }
  register(form: NgForm) {
    if (this.password != this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }
  }

}
