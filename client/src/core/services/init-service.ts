import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountService = inject(AccountService);

  init() {
      const userString = localStorage.getItem('user');
      if (!userString) return of(null); // Return an observable to indicate that the initialization is complete
      const user = JSON.parse(userString);
      this.accountService.currentlyLoggedInUser.set(user);

       return of(null); // Return an observable to indicate that the initialization is complete
  }
}
