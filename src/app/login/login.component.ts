import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public notificationMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.notificationService.notifications$.subscribe((message) => {
      this.notificationMessage = message;
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe((user) => {
        if (user) {
          this.router.navigate(['/dashboard']);
        } else {
          this.notificationService.showNotification(
            'Invalid email or password'
          );
        }
      });
    } else {
      this.notificationService.showNotification(
        'Please fill out the form correctly'
      );
    }
  }
}
