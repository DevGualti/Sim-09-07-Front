import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class EmployeeGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    let allowed = false;
    // Recupera l'utente corrente dal BehaviorSubject
    const user = (this.auth as any)._currentUser$.getValue() as User | null;
    if (user && !user.isOperator) {
      allowed = true;
    }
    if (!allowed) {
      this.router.navigate(['/login']);
    }
    return allowed;
  }
} 