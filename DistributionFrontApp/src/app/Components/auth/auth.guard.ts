import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleCheckerService } from 'src/app/Services/role-checker.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private roleChecker: RoleCheckerService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('loggedUser') != null && this.roleChecker.checkPageRole() === true) {
      return true;
    } else {
      this.router.navigate(['/login-register']);
      return false;
    }
  }
}
