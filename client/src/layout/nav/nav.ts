import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected creds: any={}
  private router = inject(Router);
  private toast = inject(ToastService);

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigateByUrl('/members'); // Navigate to the members page after successful login
        this.toast.success('Login successful!'); // Show a success toast message
        this.creds = {}; // Clear the credentials after successful login
      },
      error: (error) => {
        // console.error('Login failed:', error);
        this.toast.error(error.error);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/'); // Navigate to the home page after logout
  }
}
