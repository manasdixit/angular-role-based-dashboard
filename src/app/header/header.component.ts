import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
